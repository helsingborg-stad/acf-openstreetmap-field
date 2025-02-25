class Description implements Field {
    descriptionContainer: HTMLElement|null;
    description: HTMLTextAreaElement|null;
    constructor(private overlayInstance: OverlayInterface) {
        this.descriptionContainer = this.overlayInstance.getOverlay()?.querySelector('[data-js-marker-edit-description]') ?? null;
        this.description = this.getContainer()?.querySelector('textarea') ?? null;
    }

    public getContainer(): HTMLElement|null {
        return this.descriptionContainer;
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