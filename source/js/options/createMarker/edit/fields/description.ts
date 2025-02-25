class Description implements Field {
    description: HTMLTextAreaElement|null;
    constructor(private overlayInstance: OverlayInterface) {
        this.description = this.overlayInstance.getOverlay()?.querySelector('[data-js-marker-edit-description]') ?? null;
    }

    public getField(): HTMLTextAreaElement|null {
        return this.description;
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

export default Description;