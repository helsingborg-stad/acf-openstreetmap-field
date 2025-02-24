class Description implements DescriptionInterface {
    description: HTMLTextAreaElement|null;
    constructor(private overlayInstance: OverlayInterface) {
        this.description = this.overlayInstance.getOverlay()?.querySelector('[data-js-marker-edit-description]') ?? null;
    }

    getDescriptionField(): HTMLTextAreaElement|null {
        return this.description;
    }

    setDescriptionValue(value: string): void {
        if (!this.description) {
            return;
        }

        this.description.value = value;
    }

    getDescriptionValue(): string {
        if (!this.description) {
            return '';
        }

        return this.description.value;
    }
}

export default Description;