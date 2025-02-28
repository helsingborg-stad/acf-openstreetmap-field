declare const wp: any;

class Image implements Field {
    imageContainer: HTMLElement|null;
    image: HTMLInputElement|null;
    button: HTMLButtonElement|null;
    constructor(private overlayInstance: OverlayInterface) {
        this.imageContainer = this.overlayInstance.getOverlay()?.querySelector('[data-js-field-edit-image]') ?? null;
        this.button = this.getContainer()?.querySelector('[data-js-field-edit-image-button]') ?? null;
        this.image = this.getContainer()?.querySelector('input') ?? null;
        this.setButtonListener();
    }

    private setButtonListener(): void {
        this.button?.addEventListener('click', () => {
            if (!wp) {
                return;
            }

            const mediaUploader = wp.media({
                title: 'Select Image',
                button: {
                    text: 'Use this image'
                },
                multiple: false
            });

            mediaUploader.on('select', () => {
                const imageUrl = mediaUploader.state().get('selection').first().toJSON().url;
                this.setValue(imageUrl);
            });

            mediaUploader.open();
        });
    }

    public getContainer(): HTMLElement|null {
        return this.imageContainer;
    }

    public getField(): HTMLInputElement|null {
        return this.image;
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

        this.getContainer()!.classList.add('is-visible');
    }

    public hideField(): void {
        if (!this.getContainer()) {
            return;
        }

        this.getContainer()!.classList.remove('is-visible');
    }
}

export default Image;