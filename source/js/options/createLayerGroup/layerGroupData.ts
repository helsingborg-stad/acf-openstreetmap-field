import { Addable } from "../../../OpenStreetMap/js/addableInterface";
import { AddTo } from "../../../OpenStreetMap/js/addToInterface";
import { CreateLayerGroupInterface } from "../../../OpenStreetMap/js/features/createLayerGroup/createLayerGroupInterface";
import { LayerGroupInterface } from "../../../OpenStreetMap/js/features/createLayerGroup/layerGroupInterface";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import EditLayerGroupDataFactory from "./edit/editLayerGroupDataFactory";
import { LayerGroupDataInterface, LayerGroupsDataStorage } from "./layerGroupDataInterface";
import { LayerGroupsListInterface } from "./layerGroupsListInterface";

class LayerGroupData implements LayerGroupDataInterface {
    private static layerGroups: LayerGroupsDataStorage = {};
    private static idCounter: number = 0;
    private id: number = Date.now() + LayerGroupData.idCounter++;
    private title: string = '';
    private editor: EditLayerGroupDataInterface;

    constructor(
        private mapInstance: MapInterface&Addable,
        private createLayerGroupInstance: CreateLayerGroupInterface,
        private editLayerGroupDataFactoryInstance: EditLayerGroupDataFactory,
        private layerGroupsListInstance: LayerGroupsListInterface
    ) {
        this.editor = this.editLayerGroupDataFactoryInstance.create(this);
    }

    public createLayerGroup(): LayerGroupInterface&AddTo&Addable {
        const layer = this.createLayerGroupInstance.create();
        layer.addTo(this.mapInstance);
        
        LayerGroupData.layerGroups[this.getId()] = this;
        this.layerGroupsListInstance.addItem(this);

        return layer;
    }

    public editLayerGroup(): void {
        this.editor.edit();
    }

    public deleteLayerGroup(): void {
        if (LayerGroupData.layerGroups[this.id]) {
            delete LayerGroupData.layerGroups[this.id];
        }

        this.layerGroupsListInstance.removeItem(this);
    }

    public updateLayerGroup(): void {
        this.layerGroupsListInstance.updateItem(this);
    }

    public setTitle(title: string) {
        this.title = title;
    }

    public getTitle() {
        return this.title;
    }

    public getId(): number {
        return this.id;
    }

    public static getLayerGroups() {
        return LayerGroupData.layerGroups;
    }
}

export default LayerGroupData;