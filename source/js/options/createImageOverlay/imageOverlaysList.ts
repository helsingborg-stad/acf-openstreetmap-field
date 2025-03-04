import { createListItem } from "../../helper/createListItem";
import { ImageOverlayDataInterface } from "./imageOverlayDataInterface";

class ImageOverlaysList implements ImageOverlaysListInterface {
    imageOverlaysList: HTMLElement|null;
    listedImageOverlays: ImageOverlaysStorage = {};
    constructor(private container: HTMLElement) {
        this.imageOverlaysList = this.container.querySelector('[data-js-image-overlay-list]');
    }

    public addItem(imageOverlayData: ImageOverlayDataInterface): void {
        const listItem = createListItem(this.getLayerGroupTitle(imageOverlayData));
        this.imageOverlaysList?.appendChild(listItem);
        this.listedImageOverlays[imageOverlayData.getId()] = {imageOverlay: imageOverlayData, listItem: listItem};
        this.setClickListener(listItem, imageOverlayData);
    }

    public removeItem(imageOverlayData: ImageOverlayDataInterface): void {
        this.listedImageOverlays[imageOverlayData.getId()]?.listItem.remove();
        delete this.listedImageOverlays[imageOverlayData.getId()];
    }

    public updateItem(imageOverlayData: ImageOverlayDataInterface): void {
        if (!this.listedImageOverlays[imageOverlayData.getId()].listItem) {
            return;
        }

        this.listedImageOverlays[imageOverlayData.getId()].listItem.querySelector('span')!.textContent = this.getLayerGroupTitle(imageOverlayData);
    }

    private setClickListener(listItem: HTMLLIElement, imageOverlayData: ImageOverlayDataInterface): void {
        listItem.addEventListener('click', () => {
            imageOverlayData.editImageOverlay();
        });
    }

    // TODO: Add translation
    private getLayerGroupTitle(imageOverlayData: ImageOverlayDataInterface): string {
        return imageOverlayData.getTitle() ? imageOverlayData.getTitle() : 'Unnamed image overlay';
    }
}

export default ImageOverlaysList;