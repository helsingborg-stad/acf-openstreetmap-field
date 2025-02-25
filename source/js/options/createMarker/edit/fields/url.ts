class Url implements Field {
    private url: HTMLInputElement|null;
    constructor(private overlayInterface: OverlayInterface) {
        this.url = this.overlayInterface.getOverlay()?.querySelector('[data-js-marker-edit-url]') ?? null;
    }

    public getField(): HTMLInputElement|null {
        return this.url;
    }

    public setValue(value: string): void {
        if (!this.getField()) {
            return;
        }

        this.getField()!.value = value;
    }

    public getValue(): string {
        if (!this.getField()) {
            return '';
        }

        return this.getField()!.value;
    }

    public showField(): void {
        if (!this.getField()) {
            return;
        }

        this.getField()!.style.display = 'block';
    }

    public hideField(): void {
        if (!this.getField()) {
            return;
        }

        this.getField()!.style.display = 'none';
    }
}

export default Url;