import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import EditMarkerDataFactory from "./edit/editMarkerDataFactory";
import { EditMarkerDataInterface } from "./edit/editMarkerDataInterface";
import MarkerData from "./markerData";
import { MarkerDataInterface } from "./markerDataInterface";
import { MarkerFactoryInterface } from "./markerFactoryInterface";
import { MarkerStorageInterface } from "./markerStorageInterface";

class MarkerFactory implements MarkerFactoryInterface {
    private idCounter = 0;
    constructor(
        private createMarkersInstance: CreateMarkerInterface,
        private editMarkerDataFactoryInstance: EditMarkerDataFactory,
        private markerStorageInstance: MarkerStorageInterface
    ) {}

    public create(): MarkerDataInterface {
        return new MarkerData(this.createMarkersInstance, this.editMarkerDataFactoryInstance, this.markerStorageInstance);
    }
}

export default MarkerFactory;