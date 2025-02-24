import { MarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { EditMarkerDataInterface } from "./edit/editMarkerDataInterface";
import MarkerData from "./markerData";
import { MarkerDataInterface } from "./markerDataInterface";
import { MarkerFactoryInterface } from "./markerFactoryInterface";

class MarkerFactory implements MarkerFactoryInterface {
    constructor(private editMarkerDataInstance: EditMarkerDataInterface) {}

    public create(
        marker: MarkerInterface,
        id: string,
    ): MarkerDataInterface {
        return new MarkerData(marker, id, this.editMarkerDataInstance);
    }
}

export default MarkerFactory;