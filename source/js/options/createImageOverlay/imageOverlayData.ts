import { CreateImageOverlayInterface } from "../../../OpenStreetMap/js/features/createImageOverlay/createImageOverlayInterface";
import { CreateRectangleInterface } from "../../../OpenStreetMap/js/features/createRectangle/createRectangleInterface";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import EditImageOverlayFactory from "./edit/editImageOverlayDataFactory";

class ImageOverlayData implements ImageOverlayDataInterface {
    private editor: EditImageOverlayDataInterface;
    constructor(
        private mapInstance: MapInterface,
        private createImageOverlayInstance: CreateImageOverlayInterface,
        private createRectangle: CreateRectangleInterface,
        private editImageOverlayFactoryInstance: EditImageOverlayFactory
    ) {
        this.editor = this.editImageOverlayFactoryInstance.create(this);
    }

    public createImageOverlay(): void {}
    public editImageOverlay(): void {
        this.editor.edit();
    }

    public setTitle(title: string): void {}
    public getTitle(): string {
        return '';
    }
    public getLayerGroup(): string {
        return '';
    }
    public setLayerGroup(layerGroup: string): void {}
    public updateImageOverlay(): void {}
    public deleteImageOverlay(): void {}
    public getId(): string {
        return '';
    }
}

export default ImageOverlayData;