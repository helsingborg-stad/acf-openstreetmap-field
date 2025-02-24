import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import { LatLngObject } from "../../../OpenStreetMap/js/types";
import { EditMarkerDataInterface } from "./edit/editMarkerDataInterface";
import { MarkerDataInterface } from "./markerDataInterface";
import { MarkerFactoryInterface } from "./markerFactoryInterface";
import { MarkersDataInterface, MarkersInterface } from "./markersInterface";

class Markers implements MarkersInterface {
    private idCounter = 0;
    private markers: MarkersDataInterface = {};
    private currentMarker: MarkerDataInterface|null = null;

    constructor(
        private createMarkerInstance: CreateMarkerInterface,
        private markerFactoryInstance: MarkerFactoryInterface,
        private editMarkerDataInstance: EditMarkerDataInterface,
        private markerCssClass: string = 'marker-create',
    ) {}

    public getCurrentMarker(): MarkerDataInterface|null {
        return this.currentMarker;
    }

    public setCurrentMarker(marker: MarkerDataInterface|null): void {
        this.currentMarker = marker;
    }

    public addMarker(latlng: LatLngObject): MarkerDataInterface {
        const marker = this.createMarkerInstance.create({
            position: latlng,
            icon: this.getMarkerMarkup(),
            draggable: true,
        });

        const id = `marker-${this.idCounter++}`;
        const markerData = this.markerFactoryInstance.create(marker, id);
        this.markers[id] = markerData;

        marker.addListener('click', (e) => {
            this.setCurrentMarker(markerData);
            this.editMarkerDataInstance.edit(markerData);
        });

        return markerData;
    }

    public removeMarker(id: string): void {
        if (!this.markers[id]) {
            return;
        }

        this.markers[id].getMarker().removeMarker();
        delete this.markers[id];
    }

    public getMarkers(): MarkersDataInterface {
        return this.markers;
    }

    private getMarkerMarkup(): string {
        return `<div class="${this.markerCssClass}" style="color: green;">C</div>`;
    }
}

export default Markers;