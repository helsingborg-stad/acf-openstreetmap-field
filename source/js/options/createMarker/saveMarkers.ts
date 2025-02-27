import { SavedMarkerData } from "../../types";
import { SaveOptionDataInterface } from "../saveOptionData";
import MarkerData from "./markerData";

class SaveMarkers implements SaveOptionDataInterface {
    constructor() {}

    public save(): SavedMarkerData {
        let data = [];
        for (let marker of Object.values(MarkerData.getMarkers())) {
            data.push({
                title: marker.getTitle(),
                url: marker.getUrl(),
                description: marker.getDescription(),
                position: marker.getMarker()?.getPosition() ?? {lat: 0, lng: 0},
                layerGroup: marker.getLayerGroup() ?? ''
            });
        }

        return data;
    }
}

export default SaveMarkers;