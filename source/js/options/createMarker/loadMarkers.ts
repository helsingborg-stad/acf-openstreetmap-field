import { SaveMarkerData } from "../../types";
import { MarkersInterface } from "./markersInterface";

class LoadMarkers implements LoadOptionDataInterface {
    constructor(private markerInstance: MarkersInterface) {}

    public load(savedMarkers: SaveMarkerData): void {
        for (let savedMarker of savedMarkers) {
            const marker = this.markerInstance.addMarker(
                savedMarker.position
            );

            marker.setTitle(savedMarker.title ?? '');
            marker.setUrl(savedMarker.url ?? '');
            marker.setDescription(savedMarker.description ?? '');
        }
    }
}

export default LoadMarkers;