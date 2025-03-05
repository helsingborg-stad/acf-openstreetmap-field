import { OptionFeature } from "../optionFeature";

class OptionCreateImageOverlay implements OptionFeature {
    protected condition: string = 'create_image_overlay';

    constructor(
        private container: HTMLElement,
        private handleSelectedInstance: HandleSelectedInterface,
        private imageOverlayFactoryInstance: ImageOverlayFactoryInterface
    ) {
        this.addListener();
    }

    private addListener(): void {

        this.container.querySelector(`[data-js-value="${this.condition}"]`)?.addEventListener('click', (e) => {
            e.preventDefault();
            const imageOverlayData = this.imageOverlayFactoryInstance.create();
            imageOverlayData.editImageOverlay();

            this.handleSelectedInstance.clearSelected();
        });
    }

    public checkCondition(value: string): boolean {
        return value === this.condition;
    }
}

export default OptionCreateImageOverlay;