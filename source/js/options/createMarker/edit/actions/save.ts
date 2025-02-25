import { MarkersListInterface } from "../../markersListInterface";
import { MarkerStorageInterface } from "../../markerStorageInterface";

class Save {
    saveButton: HTMLElement|null;
    constructor(
        private markersListInstance: MarkersListInterface,
        private markerStorageInstance: MarkerStorageInterface,
        private fieldValidatorInstance: FieldValidatorInterface,
        private overlayInstance: OverlayInterface,
        private titleInstance: TitleInterface,
        private urlInstance: UrlInterface,
        private descriptionInstance: DescriptionInterface,
    ) {
        this.saveButton = this.overlayInstance.getOverlay()?.querySelector('[data-js-marker-edit-save]') ?? null;

        this.setupListener();
    }

    private setupListener() {
        this.saveButton?.addEventListener('click', () => {
            const markerData = this.markerStorageInstance.getActiveMarker();

            if (!markerData) {
                this.overlayInstance.hideOverlay();
                return;
            }

            if (!this.fieldValidatorInstance.validateUrl(this.urlInstance.getUrlValue() ?? '')) {
                return;
            }

            markerData.setTitle(this.titleInstance.getTitleValue() ?? '');
            markerData.setUrl(this.urlInstance.getUrlValue() ?? '');
            markerData.setDescription(this.descriptionInstance.getDescriptionValue() ?? '');
            this.markersListInstance.updateItem(markerData);
            this.markerStorageInstance.setActiveMarker(null);
            this.overlayInstance.hideOverlay();
        });
    }
}

export default Save;