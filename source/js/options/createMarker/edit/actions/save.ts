import { MarkersListInterface } from "../../markersListInterface";
import { MarkerStorageInterface } from "../../markerStorageInterface";

class Save {
    saveButton: HTMLElement|null;
    constructor(
        private markersListInstance: MarkersListInterface,
        private markerStorageInstance: MarkerStorageInterface,
        private fieldValidatorInstance: FieldValidatorInterface,
        private overlayInstance: OverlayInterface,
        private titleInstance: Field,
        private urlInstance: Field,
        private descriptionInstance: Field,
    ) {
        this.saveButton = this.overlayInstance.getOverlay()?.querySelector('[data-js-marker-edit-save]') ?? null;

        this.setupListener();
    }

    private setupListener() {
        this.saveButton?.addEventListener('click', () => {
            const markerData = this.markerStorageInstance.getActiveMarker();

            if (!markerData) {
                this.hide();
                return;
            }

            if (!this.fieldValidatorInstance.validateUrl(this.urlInstance.getValue() ?? '')) {
                return;
            }

            markerData.setTitle(this.titleInstance.getValue() ?? '');
            markerData.setUrl(this.urlInstance.getValue() ?? '');
            markerData.setDescription(this.descriptionInstance.getValue() ?? '');
            this.markersListInstance.updateItem(markerData);
            this.markerStorageInstance.setActiveMarker(null);
            this.hide();
        });
    }

    private hide() {
        this.overlayInstance.hideOverlay();
        this.titleInstance.hideField();
        this.urlInstance.hideField();
        this.descriptionInstance.hideField();
    }
}

export default Save;