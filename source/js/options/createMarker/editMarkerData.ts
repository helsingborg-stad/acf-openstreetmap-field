import { MarkerDataInterface } from "./markerDataInterface";

class EditMarkerData implements EditMarkerDataInterface {
    overlay: HTMLElement|null;
    title: HTMLInputElement|null;
    url: HTMLInputElement|null;
    description: HTMLTextAreaElement|null;
    currentMarker: MarkerDataInterface|null = null;
    saveButton: HTMLButtonElement|null;
    cancelButton: HTMLButtonElement|null;

    constructor(private container: HTMLElement, private fieldValidatorInstance: FieldValidatorInterface) {
        this.overlay = this.container.querySelector('[ data-js-marker-edit-overlay]');
        this.title = this.overlay?.querySelector('[data-js-marker-edit-title]') ?? null;
        this.url = this.overlay?.querySelector('[data-js-marker-edit-url]') ?? null;
        this.description = this.overlay?.querySelector('[data-js-marker-edit-description]') ?? null;
        this.saveButton = this.overlay?.querySelector('[data-js-marker-edit-save]') ?? null;
        this.cancelButton = this.overlay?.querySelector('[data-js-marker-edit-cancel]') ?? null;

        this.setListeners();
    }

    private setListeners(): void {
        this.saveButton?.addEventListener('click', () => {
            if (!this.currentMarker) {
                this.hideOverlay();
                return;
            }

            if (!this.fieldValidatorInstance.validateUrl(this.url?.value ?? '')) {
                return;
            }

            this.currentMarker.setTitle(this.title?.value ?? '');
            this.currentMarker.setUrl(this.url?.value ?? '');
            this.currentMarker.setDescription(this.description?.value ?? '');
            this.hideOverlay();
            this.currentMarker = null;
        });

        this.cancelButton?.addEventListener('click', () => {
            this.hideOverlay();
            this.currentMarker = null;
        });
    }

    public setCurrentMarker(marker: MarkerDataInterface): void {
        this.currentMarker = marker;
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
}

export default EditMarkerData;