class Overlay implements OverlayInterface {
    private overlay: HTMLElement|null;
    constructor(private container: HTMLElement) {
        this.overlay = this.container.querySelector('[ data-js-field-edit-overlay]');

        this.setListeners();
    }

    private setListeners(): void {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.hideOverlay();
            }
        });
    }

    public getOverlay(): HTMLElement|null {
        return this.overlay;
    }

    public showOverlay(): void {
        if (!this.overlay) {
            return;
        }

        this.overlay.classList.add('is-open');
    }

    public hideOverlay(): void {
        if (!this.overlay) {
            return;
        }

        this.overlay.classList.remove('is-open');
    }
}

export default Overlay;