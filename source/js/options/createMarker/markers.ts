import { MarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import MarkerData from "./markerData";

class Markers implements MarkersInterface {
    private static idCounter = 0;
    private markers: Record<string, MarkerData> = {};

    constructor(private mapInstance: MapInterface, private container: HTMLElement) {
    }

    public addMarker(marker: MarkerInterface) {
        const id = `marker-${Markers.idCounter++}`;
        this.markers[id] = new MarkerData(marker, id);
    }

    public removeMarker(id: string): void {
        if (!this.markers[id]) {
            return;
        }

        this.markers[id].getMarker().removeMarker();
        delete this.markers[id];
    }
}

export default Markers;