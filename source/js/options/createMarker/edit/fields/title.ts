class Title implements TitleInterface{
    private title: HTMLInputElement|null;
    constructor(private overlayInterface: OverlayInterface) {
        this.title = this.overlayInterface.getOverlay()?.querySelector('[data-js-marker-edit-title]') ?? null;
    }

    public getTitleField(): HTMLInputElement|null {
        return this.title;
    }

    public setTitleValue(value: string): void {
        if (!this.title) {
            return;
        }

        this.title.value = value;
    }

    public getTitleValue(): string {
        if (!this.title) {
            return '';
        }

        return this.title.value;
    }
}

export default Title;