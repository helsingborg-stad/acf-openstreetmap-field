import { SaveMarkerData } from "../../types";
import { OptionCreateMarkerInterface } from "./optionCreateMarkerInterface";

class LoadMarkers implements LoadOptionDataInterface {
    constructor(private optionCreateMarkerInstance: OptionCreateMarkerInterface) {}

    public load(savedMarkers: SaveMarkerData): void {
        for (let savedMarker of savedMarkers) {
            const marker = this.optionCreateMarkerInstance.addMarker(
                savedMarker.position
            );

            marker.setTitle(savedMarker.title ?? '');
            marker.setUrl(savedMarker.url ?? '');
            marker.setDescription(savedMarker.description ?? '');
        }
    }
}

export default LoadMarkers;