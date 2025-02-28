import { CreateImageOverlayInterface } from "../../../OpenStreetMap/js/features/createImageOverlay/createImageOverlayInterface";
import { CreateRectangleInterface } from "../../../OpenStreetMap/js/features/createRectangle/createRectangleInterface";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import EditImageOverlayFactory from "./edit/editImageOverlayDataFactory";
import ImageOverlayData from "./imageOverlayData";

class ImageOverlayFactory implements ImageOverlayFactoryInterface {
    constructor(
        private mapInstance: MapInterface,
        private createImageOverlayInstance: CreateImageOverlayInterface,
        private createRectangle: CreateRectangleInterface,
        private editImageOverlayFactoryInstance: EditImageOverlayFactory,
    ) {

    }
    public create(): ImageOverlayDataInterface {
        return new ImageOverlayData(
            this.mapInstance,
            this.createImageOverlayInstance,
            this.createRectangle,
            this.editImageOverlayFactoryInstance,
        );
    }
}

export default ImageOverlayFactory;