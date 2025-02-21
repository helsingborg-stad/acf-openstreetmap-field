import { SaveMarkerData } from "../../types";
import { OptionCreateMarkerInterface } from "./optionCreateMarkerInterface";

class SaveMarkers implements SaveOptionDataInterface {
    constructor(private optionCreateMarkerInstance: OptionCreateMarkerInterface) {}

    public save(): SaveMarkerData {
        let data = [];
        for (let marker of Object.values(this.optionCreateMarkerInstance.getMarkers())) {
            data.push({
                title: marker.getTitle(),
                url: marker.getUrl(),
                description: marker.getDescription(),
                position: marker.getMarker().getPosition(),
            });
        }

        return data;
    }
}

export default SaveMarkers;