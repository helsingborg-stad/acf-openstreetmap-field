import { MapInterface, MarkerInterface, LatLngObject, CreateMarkerInterface, LayerGroupInterface } from "@helsingborg-stad/openstreetmap";
import EditMarkerDataFactory from "./edit/editMarkerDataFactory";
import { EditMarkerDataInterface } from "./edit/editMarkerDataInterface";
import { MarkerDataInterface, MarkersDataStorage } from "./markerDataInterface";
import { MarkersListInterface } from "./markersListInterface";
import LayerGroupData from "../createLayerGroup/layerGroupData";

class MarkerData implements MarkerDataInterface {
    private static idCounter = 0;
    private id = `marker-${MarkerData.idCounter++}`;
    private title: string = '';
    private content: string = '';
    private url: string = '';
    private layerGroup: string = '';
    private marker: MarkerInterface|null = null;
    private markerCssClass: string = 'marker-create';
    private editor: EditMarkerDataInterface;
    private static markers: MarkersDataStorage = {};

    constructor(
        private mapInstance: MapInterface,
        private createMarkerInstance: CreateMarkerInterface,
        private editMarkerDataFactoryInstance: EditMarkerDataFactory,
        private markersListInstance: MarkersListInterface,
        private iconFactoryInstance: IconFactoryInterface
    ) {
        this.editor = this.editMarkerDataFactoryInstance.create(this);
    }

    public createMarker(latlng: LatLngObject): MarkerInterface {
        if (this.marker) {
            return this.marker;
        }

        this.marker = this.createMarkerInstance.create({
            position: latlng,
            html: this.getMarkerMarkup(),
            draggable: true,
            iconSize: [32, 32],
            iconAnchor: [16, 4]
        });

        this.addMarkerToMap();
    
        this.marker.addListener('click', (e) => {
            this.editMarker();
        });

        MarkerData.markers[this.getId()] = this;
        this.markersListInstance.addItem(this);

        return this.marker;
    }

    public deleteMarker(): void {
        if (MarkerData.markers[this.getId()]) {
            delete MarkerData.markers[this.getId()];
        }

        this.getMarker()?.removeMarker();
        this.markersListInstance.removeItem(this);
    }

    public updateMarker(): void {
        this.markersListInstance.updateItem(this);
    }

    public static getMarkers(): MarkersDataStorage {
        return MarkerData.markers;
    }

    public editMarker(): void {
        this.editor.edit();
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getTitle(): string {
        return this.title;
    }

    public setDescription(content: string): void {
        this.content = content;
    }

    public getDescription(): string {
        return this.content
    }

    public setLayerGroup(layerGroup: string): void {
        if (this.getLayerGroup() === layerGroup) {
            return;
        }

        this.layerGroup = layerGroup;
        this.getMarker()?.setIcon({
            html: this.getMarkerMarkup(),
            iconSize: [32, 32],
            iconAnchor: [16, 4]
        });

        this.addMarkerToMap();
    }

    public getLayerGroup(): string {
        return this.layerGroup;
    }

    public setUrl(url: string): void {
        this.url = url;
    }

    public getUrl(): string {
        return this.url;
    }

    public getId(): string {
        return this.id;
    }

    public getMarker(): MarkerInterface|null {
        return this.marker ?? null;
    }

    private addMarkerToMap(): void {
        if (!this.marker) {
            return;
        }

        if (LayerGroupData.getLayerGroups()[this.getLayerGroup()]?.getLayer()) {
            return this.marker.addTo(LayerGroupData.getLayerGroups()[this.getLayerGroup()].getLayer() as LayerGroupInterface);
        }

        return this.marker.addTo(this.mapInstance);
    }

    private getMarkerMarkup(): string {
        const layerGroups = LayerGroupData.getLayerGroups();
        let color = '#E04A39';
        let icon  = null;

        if (layerGroups[this.getLayerGroup()]) {
            color = layerGroups[this.getLayerGroup()].getColor();
            icon  = layerGroups[this.getLayerGroup()].getIcon();
        }
        return this.iconFactoryInstance.create(icon ? icon : 'location', color, 32);
    }
}

export default MarkerData;