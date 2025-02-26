import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import { MarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { LatLngObject } from "../../../OpenStreetMap/js/types";
import EditMarkerDataFactory from "./edit/editMarkerDataFactory";
import { EditMarkerDataInterface } from "./edit/editMarkerDataInterface";
import { MarkerDataInterface } from "./markerDataInterface";
import { MarkerStorageInterface } from "./markerStorageInterface";

class MarkerData implements MarkerDataInterface {
    private static idCounter = 0;
    private id = `marker-${MarkerData.idCounter++}`;
    private title: string = '';
    private content: string = '';
    private url: string = '';
    private marker: MarkerInterface|null = null;
    private markerCssClass: string = 'marker-create';
    private editor: EditMarkerDataInterface;

    constructor(
        private createMarkerInstance: CreateMarkerInterface,
        private editMarkerDataFactoryInstance: EditMarkerDataFactory,
        private markerStorageInstance: MarkerStorageInterface
    ) {
        this.editor = this.editMarkerDataFactoryInstance.create(this);
    }

    public createMarker(latlng: LatLngObject): MarkerInterface {
        if (this.marker) {
            return this.marker;
        }

        this.marker = this.createMarkerInstance.create({
            position: latlng,
            icon: this.getMarkerMarkup(),
            draggable: true
        });

        this.marker.addListener('click', (e) => {
            this.editMarker();
        });

        this.markerStorageInstance.addMarker(this);

        return this.marker;
    }

    public editMarker(): void {
        this.markerStorageInstance.setActiveMarker(this);
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

    private getMarkerMarkup(): string {
        return `<div class="${this.markerCssClass}" style="color: green;">C</div>`;
    }
}

export default MarkerData;