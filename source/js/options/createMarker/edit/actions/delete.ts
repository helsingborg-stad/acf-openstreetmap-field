import { MarkerStorageInterface } from "../../markerStorageInterface";

class Delete {
    deleteButton: HTMLElement|null;
    constructor(
        private markerStorageInstance: MarkerStorageInterface,
        private overlayInstance: OverlayInterface
    ) {
        this.deleteButton = this.overlayInstance.getOverlay()?.querySelector('[data-js-marker-edit-delete]') ?? null;
        this.setupListener();
    }

    private setupListener() {
        this.deleteButton?.addEventListener('click', () => {
            console.log("click");
            const markerData = this.markerStorageInstance.getActiveMarker();

            if (!markerData) {
                this.overlayInstance.hideOverlay();
                return;
            }

            this.markerStorageInstance.deleteActiveMarker();
            this.overlayInstance.hideOverlay();
        });
    }
}

export default Delete;