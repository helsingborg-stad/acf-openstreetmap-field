import { MarkerDataInterface } from "../markerDataInterface";
import { EditMarkerDataInterface } from "./editMarkerDataInterface";

class EditMarkerData implements EditMarkerDataInterface, Editable {
    constructor(
        private markerData: MarkerDataInterface,
        private fieldValidatorInstance: FieldValidatorInterface,
        private editInstance: EditInterface,
        private overlayInstance: OverlayInterface,
        private titleInstance: Field,
        private urlInstance: Field,
        private descriptionInstance: Field,
        private layerInstance: Field
    ) {
    }

    public edit(): void {
        this.setDefaultFieldValues();
        this.editInstance.setActiveEditable(this);
        this.showFields();
    }

    private setDefaultFieldValues(): void {
        this.titleInstance.setValue(this.markerData.getTitle());
        this.urlInstance.setValue(this.markerData.getUrl());
        this.descriptionInstance.setValue(this.markerData.getDescription());
        this.layerInstance.setValue(this.markerData.getLayerGroup());
    }

    public save() {
        if (!this.fieldValidatorInstance.validateUrl(this.urlInstance.getValue() ?? '')) {
            return;
        }

        this.markerData.setTitle(this.titleInstance.getValue() ?? '');
        this.markerData.setUrl(this.urlInstance.getValue() ?? '');
        this.markerData.setDescription(this.descriptionInstance.getValue() ?? '');
        this.markerData.setLayerGroup(this.layerInstance.getValue() ?? '');
        this.markerData.updateMarker();
        this.editInstance.setActiveEditable(null);
        this.hideFields();
    }

    public cancel() {
        this.editInstance.setActiveEditable(null);
        this.hideFields();
    }

    public delete() {
        this.markerData.deleteMarker();
        this.editInstance.setActiveEditable(null);
        this.hideFields();
    }

    public hideFields() {
        this.layerInstance.hideField();
        this.titleInstance.hideField();
        this.urlInstance.hideField();
        this.descriptionInstance.hideField();
        this.overlayInstance.hideOverlay();
    }

    public showFields() {
        this.layerInstance.showField();
        this.titleInstance.showField();
        this.urlInstance.showField();
        this.descriptionInstance.showField();
        this.overlayInstance.showOverlay();
    }
}

export default EditMarkerData;