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
        private markerFactoryInstance: MarkerFactoryInterface
    ) {}

    public getCurrentMarker(): MarkerDataInterface|null {
        return this.currentMarker;
    }

    public setCurrentMarker(marker: MarkerDataInterface|null): void {
        this.currentMarker = marker;
    }

    public addMarker(latlng: LatLngObject): MarkerDataInterface {
        const id = `marker-${this.idCounter++}`;
        const markerData = this.markerFactoryInstance.create(id, this);
        this.markers[id] = markerData;
        markerData.createMarker(latlng);

        return markerData;
    }

    public removeMarker(id: string): void {
        if (!this.markers[id]) {
            return;
        }

        this.markers[id].getMarker()?.removeMarker();
        delete this.markers[id];
    }

    public getMarkers(): MarkersDataInterface {
        return this.markers;
    }
}

export default Markers;