class EditMarkerData implements EditMarkerDataInterface {
    overlay: HTMLElement|null;
    title: HTMLInputElement|null;
    url: HTMLInputElement|null;
    description: HTMLTextAreaElement|null;

    constructor(private container: HTMLElement) {
        this.overlay = this.container.querySelector('[ data-js-marker-edit-overlay]');
        this.title = this.overlay?.querySelector('[data-js-marker-edit-title]') ?? null;
        this.url = this.overlay?.querySelector('[data-js-marker-edit-url]') ?? null;
        this.description = this.overlay?.querySelector('[data-js-marker-edit-description]') ?? null;
    }

    public showOverlay(): void {
        if (!this.overlay) {
            return;
        }

        this.overlay.classList.add('is-open');
    }

    public setTitleValue(value: string): void {
        if (!this.title) {
            return;
        }

        this.title.value = value;
    }

    public setUrlValue(value: string): void {
        if (!this.url) {
            return;
        }

        this.url.value = value;
    }

    public setDescriptionValue(value: string): void {
        if (!this.description) {
            return;
        }

        this.description.value = value;
    }

    private clearInputs(): void {
        if (this.title) {
            this.title.value = '';
        }

        if (this.url) {
            this.url.value = '';
        }

        if (this.description) {
            this.description.value = '';
        }
    }
}

export default EditMarkerData;