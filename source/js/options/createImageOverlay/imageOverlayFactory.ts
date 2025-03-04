import { CreateImageOverlayInterface } from "../../../OpenStreetMap/js/features/createImageOverlay/createImageOverlayInterface";
import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import { CreateRectangleInterface } from "../../../OpenStreetMap/js/features/createRectangle/createRectangleInterface";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import EditImageOverlayFactory from "./edit/editImageOverlayDataFactory";
import ImageOverlayCalculator from "./helper/imageOverlayBoundsAndRatioCalculator";
import { ImageOverlayBoundsAndRatioCalculatorInterface } from "./helper/imageOverlayBoundsAndRatioCalculatorInterface";
import ImageOverlayData from "./imageOverlayData";
import { ImageOverlayResizeInterface } from "./imageFunctionality/imageOverlayResizeInterface";
import { ImageOverlayMoveInterface } from "./imageFunctionality/imageOverlayMoveInterface";
import { ImageOverlayDataInterface } from "./imageOverlayDataInterface";

class ImageOverlayFactory implements ImageOverlayFactoryInterface {
    constructor(
        private mapInstance: MapInterface,
        private createImageOverlayInstance: CreateImageOverlayInterface,
        private editImageOverlayFactoryInstance: EditImageOverlayFactory,
        private imageOverlaysListInstance: ImageOverlaysListInterface,
        private ImageOverlayBoundsAndRatioCalculatorInstance: ImageOverlayBoundsAndRatioCalculatorInterface,
        private imageOverlayResizeInstance: ImageOverlayResizeInterface,
        private imageOverlayMoveInstance: ImageOverlayMoveInterface
    ) {

    }
    public create(): ImageOverlayDataInterface {
        return new ImageOverlayData(
            this.mapInstance,
            this.createImageOverlayInstance,
            this.editImageOverlayFactoryInstance,
            this.imageOverlaysListInstance,
            this.ImageOverlayBoundsAndRatioCalculatorInstance,
            this.imageOverlayResizeInstance,
            this.imageOverlayMoveInstance
        );
    }
}

export default ImageOverlayFactory;