import { MarkerStorageInterface } from "../../markerStorageInterface";

class Cancel {
    cancelButton: HTMLElement|null;

    constructor(
        private markerStorageInstance: MarkerStorageInterface,
        private overlayInstance: OverlayInterface
    ) {
        this.cancelButton = this.overlayInstance.getOverlay()?.querySelector('[data-js-marker-edit-cancel]') ?? null;

        this.setupListener();
    }

    private setupListener() {
        this.cancelButton?.addEventListener('click', () => {
            this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    private close() {
        this.markerStorageInstance.setActiveMarker(null);
        this.overlayInstance.hideOverlay();
    }
}

export default Cancel;