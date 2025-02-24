import { MarkersInterface } from "../../markersInterface";

class Cancel {
    cancelButton: HTMLElement|null;

    constructor(
        private markersInstance: MarkersInterface,
        private overlayInstance: OverlayInterface
    ) {
        this.cancelButton = this.overlayInstance.getOverlay()?.querySelector('[data-js-marker-edit-cancel]') ?? null;

        this.setupListener();
    }

    private setupListener() {
        this.cancelButton?.addEventListener('click', () => {
            this.markersInstance.setCurrentMarker(null);
            this.overlayInstance.hideOverlay();
        });
    }
}

export default Cancel;