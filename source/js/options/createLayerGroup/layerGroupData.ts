import { MapInterface, LayerGroupInterface, CreateLayerGroupInterface } from "@helsingborg-stad/openstreetmap";
import EditLayerGroupDataFactory from "./edit/editLayerGroupDataFactory";
import { LayerGroupDataInterface, LayerGroupsDataStorage } from "./layerGroupDataInterface";
import { LayerGroupsListInterface } from "./layerGroupsListInterface";

class LayerGroupData implements LayerGroupDataInterface {
    private static layerGroups: LayerGroupsDataStorage = {};
    private static activeLayerGroup: LayerGroupDataInterface|null = null;
    private title: string = '';
    private color: string = '#000000';
    private icon: string = '';
    private layerGroup: string = '';
    private editor: EditLayerGroupDataInterface;
    private layer: LayerGroupInterface|null = null;

    constructor(
        private id: string,
        private mapInstance: MapInterface,
        private createLayerGroupInstance: CreateLayerGroupInterface,
        private editLayerGroupDataFactoryInstance: EditLayerGroupDataFactory,
        private layerGroupsListInstance: LayerGroupsListInterface,
    ) {
        this.editor = this.editLayerGroupDataFactoryInstance.create(this);
    }

    public createLayerGroup(): LayerGroupInterface {
        if (this.layer) {
            return this.layer;
        }

        this.layer = this.createLayerGroupInstance.create();
        this.layer.addTo(this.mapInstance);
        
        LayerGroupData.layerGroups[this.getId()] = this;
        this.layerGroupsListInstance.addItem(this);

        return this.layer;
    }

    public editLayerGroup(): void {
        this.editor.edit();
    }

    public setActiveLayerGroup(): void {
      LayerGroupData.activeLayerGroup = this;  
    }

    public static getActiveLayerGroup(): LayerGroupDataInterface|null {
        return LayerGroupData.activeLayerGroup;
    }

    public deleteLayerGroup(): void {
        if (LayerGroupData.layerGroups[this.id]) {
            delete LayerGroupData.layerGroups[this.id];
        }

        this.layer?.removeLayerGroup();
        this.layerGroupsListInstance.removeItem(this);
    }

    public updateLayerGroup(): void {
        this.layerGroupsListInstance.updateItem(this);
    }

    public setTitle(title: string) {
        this.title = title;
        this.editor.setOptionTitle(title);
    }

    public getTitle() {
        return this.title;
    }

    public setLayerGroup(layerGroup: string) {
        this.layerGroup = layerGroup;
    }

    public getLayerGroup(): string {
        return this.layerGroup;
    }

    public setIcon(icon: string) {
        this.icon = icon;
    }

    public getIcon(): string {
        return this.icon;
    }

    public setColor(color: string) {
        this.color = color;
    }

    public getColor() {
        return this.color;
    }

    public getId(): string {
        return this.id;
    }

    public static getLayerGroups() {
        return LayerGroupData.layerGroups;
    }
}

export default LayerGroupData;