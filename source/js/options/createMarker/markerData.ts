import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import { MarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { LatLngObject } from "../../../OpenStreetMap/js/types";
import { EditMarkerDataInterface } from "./edit/editMarkerDataInterface";
import { MarkerDataInterface } from "./markerDataInterface";
import { MarkersInterface } from "./markersInterface";

class MarkerData implements MarkerDataInterface {
    private title: string = '';
    private content: string = '';
    private url: string = '';
    private marker: MarkerInterface|null = null;
    private markerCssClass: string = 'marker-create';
    constructor(
        private id: string,
        private createMarkerInstance: CreateMarkerInterface,
        private markersInstance: MarkersInterface,
        private editMarkerDataInstance: EditMarkerDataInterface
    ) {
    }

    public createMarker(latlng: LatLngObject): MarkerInterface {
        if (this.marker) {
            return this.marker;
        }

        const marker = this.createMarkerInstance.create({
            position: latlng,
            icon: this.getMarkerMarkup(),
            draggable: true
        });

        marker.addListener('click', (e) => {
            this.markersInstance.setCurrentMarker(this);
            this.editMarkerDataInstance.edit(this);
        });

        return marker;
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