import MarkerData from "../markerData";
import { MarkerDataInterface } from "../markerDataInterface";
import { EditMarkerDataInterface } from "./editMarkerDataInterface";

class EditMarkerData implements EditMarkerDataInterface, Editable {
    constructor(
        private markerData: MarkerDataInterface,
        private overlayInstance: OverlayInterface,
        private titleInstance: Field,
        private urlInstance: Field,
        private descriptionInstance: Field
    ) {
    }

    public edit(): void {
        this.setDefaultFieldValues();
        this.titleInstance.showField();
        this.urlInstance.showField();
        this.descriptionInstance.showField();
        this.overlayInstance.showOverlay();
    }

    private setDefaultFieldValues(): void {
        this.titleInstance.setValue(this.markerData.getTitle());
        this.urlInstance.setValue(this.markerData.getUrl());
        this.descriptionInstance.setValue(this.markerData.getDescription());
    }

    public save() {   
    }

    public cancel() {
    }

    public delete() {

    }
}

export default EditMarkerData;