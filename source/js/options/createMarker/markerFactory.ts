import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import { EditMarkerDataInterface } from "./edit/editMarkerDataInterface";
import MarkerData from "./markerData";
import { MarkerDataInterface } from "./markerDataInterface";
import { MarkerFactoryInterface } from "./markerFactoryInterface";
import { MarkersInterface } from "./markersInterface";

class MarkerFactory implements MarkerFactoryInterface {
    constructor(
        private createMarkersInstance: CreateMarkerInterface,
        private editMarkerDataInstance: EditMarkerDataInterface
    ) {}

    public create(
        id: string,
        markersInstance: MarkersInterface
    ): MarkerDataInterface {
        return new MarkerData(id, this.createMarkersInstance, markersInstance, this.editMarkerDataInstance);
    }
}

export default MarkerFactory;