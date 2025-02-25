import { SavedMarkerData } from "../../types";
import { MarkerFactoryInterface } from "./markerFactoryInterface";
import { MarkerStorageInterface } from "./markerStorageInterface";

class LoadMarkers implements LoadOptionDataInterface {
    constructor(
        private markerStorageInstance: MarkerStorageInterface,
        private markerFactoryInstance: MarkerFactoryInterface
    ) {}

    public load(savedMarkers: SavedMarkerData): void {
        for (let savedMarker of savedMarkers) {
            const markerData = this.markerFactoryInstance.create();
            markerData.setTitle(savedMarker.title ?? '');
            markerData.setUrl(savedMarker.url ?? '');
            markerData.setDescription(savedMarker.description ?? '');
            markerData.createMarker(savedMarker.position);
        }
    }
}

export default LoadMarkers;