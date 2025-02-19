import { MarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import MarkerData from "./markerData";

class Markers {
    private static idCounter = 0;
    private markers: Record<string, MarkerInterface> = {};

    constructor(private mapInstance: MapInterface, private container: HTMLElement) {
    }

    public addMarker(marker: MarkerInterface) {
        const id = `marker-${Markers.idCounter++}`;
        // this.markers[id] = new MarkerData(marker, id);
    }

    public removeMarker(id: string) {
        if (!this.markers[id]) {
            return;
        }

        this.markers[id].removeMarker();
        delete this.markers[id];
    }
}

export default Markers;