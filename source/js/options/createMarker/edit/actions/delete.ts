import { MarkersInterface } from "../../markersInterface";

class Delete {
    deleteButton: HTMLElement|null;
    constructor(
        private markersInstance: MarkersInterface,
        private overlayInstance: OverlayInterface
    ) {
        this.deleteButton = this.overlayInstance.getOverlay()?.querySelector('[data-js-marker-edit-delete]') ?? null;
        this.setupListener();
    }

    private setupListener() {
        this.deleteButton?.addEventListener('click', () => {
            console.log("click");
            const markerData = this.markersInstance.getCurrentMarker();

            if (!markerData) {
                this.overlayInstance.hideOverlay();
                return;
            }

            this.markersInstance.removeMarker(markerData.getId());
            this.overlayInstance.hideOverlay();
        });
    }
}

export default Delete;