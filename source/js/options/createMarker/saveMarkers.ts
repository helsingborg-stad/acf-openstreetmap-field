import { SavedMarkerData } from "../../types";
import { SaveOptionDataInterface } from "../saveOptionData";
import { MarkerStorageInterface } from "./markerStorageInterface";

class SaveMarkers implements SaveOptionDataInterface {
    constructor(private markerStorageInstance: MarkerStorageInterface) {}

    public save(): SavedMarkerData {
        let data = [];
        for (let marker of Object.values(this.markerStorageInstance.getMarkers())) {
            data.push({
                title: marker.getTitle(),
                url: marker.getUrl(),
                description: marker.getDescription(),
                position: marker.getMarker()?.getPosition() ?? {lat: 0, lng: 0}
            });
        }

        return data;
    }
}

export default SaveMarkers;