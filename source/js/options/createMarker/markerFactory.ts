import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import EditMarkerDataFactory from "./edit/editMarkerDataFactory";
import MarkerData from "./markerData";
import { MarkerDataInterface } from "./markerDataInterface";
import { MarkerFactoryInterface } from "./markerFactoryInterface";
import { MarkersListInterface } from "./markersListInterface";

class MarkerFactory implements MarkerFactoryInterface {
    constructor(
        private createMarkersInstance: CreateMarkerInterface,
        private editMarkerDataFactoryInstance: EditMarkerDataFactory,
        private markersListInstance: MarkersListInterface
    ) {}

    public create(): MarkerDataInterface {
        return new MarkerData(this.createMarkersInstance, this.editMarkerDataFactoryInstance, this.markersListInstance);
    }
}

export default MarkerFactory;