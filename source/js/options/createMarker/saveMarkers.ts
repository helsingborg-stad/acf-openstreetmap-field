import { SaveMarkerData } from "../../types";
import { SaveOptionDataInterface } from "../saveOptionData";
import { MarkersInterface } from "./markersInterface";

class SaveMarkers implements SaveOptionDataInterface {
    constructor(private markersInstance: MarkersInterface) {}

    public save(): SaveMarkerData {
        let data = [];
        for (let marker of Object.values(this.markersInstance.getMarkers())) {
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