import { MarkerDataInterface } from "../markerDataInterface";
import EditMarkerData from "./editMarkerData";
import { EditMarkerDataInterface } from "./editMarkerDataInterface";

class EditMarkerDataFactory {
    constructor(
        private overlayInstance: OverlayInterface,
        private titleInstance: Field,
        private urlInstance: Field,
        private descriptionInstance: Field
    ) {}
    public create(markerData: MarkerDataInterface): EditMarkerDataInterface {
        return new EditMarkerData(
            markerData,
            this.overlayInstance,
            this.titleInstance,
            this.urlInstance,
            this.descriptionInstance
        );
    }
}

export default EditMarkerDataFactory;