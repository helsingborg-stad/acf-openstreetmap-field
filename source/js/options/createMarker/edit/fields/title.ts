class Title implements Field {
    private titleContainer: HTMLElement|null;
    private title: HTMLInputElement|null;
    constructor(private overlayInterface: OverlayInterface) {
        this.titleContainer = this.overlayInterface.getOverlay()?.querySelector('[data-js-marker-edit-title]') ?? null;
        this.title = this.getContainer()?.querySelector('input') ?? null;
    }

    public getContainer(): HTMLElement|null {
        return this.titleContainer;
    }

    public getField(): HTMLInputElement|null {
        return this.title;
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
        if (!this.getContainer()) {
            return;
        }

        this.getContainer()!.style.display = 'block';
    }

    public hideField(): void {
        if (!this.getContainer()) {
            return;
        }

        this.getContainer()!.style.display = 'none';
    }
}

export default Title;