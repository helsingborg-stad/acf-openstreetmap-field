class Url implements UrlInterface {
    private url: HTMLInputElement|null;
    constructor(private overlayInterface: OverlayInterface) {
        this.url = this.overlayInterface.getOverlay()?.querySelector('[data-js-marker-edit-url]') ?? null;
    }

    public getUrlField(): HTMLInputElement|null {
        return this.url;
    }

    public setUrlValue(value: string): void {
        if (!this.url) {
            return;
        }

        this.url.value = value;
    }

    public getUrlValue(): string {
        if (!this.url) {
            return '';
        }

        return this.url.value;
    }
}

export default Url;