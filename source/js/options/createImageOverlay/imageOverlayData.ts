import { CreateImageOverlayInterface } from "../../../OpenStreetMap/js/features/createImageOverlay/createImageOverlayInterface";
import { ImageOverlayInterface } from "../../../OpenStreetMap/js/features/createImageOverlay/imageOverlayInterface";
import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import { CreateRectangleInterface } from "../../../OpenStreetMap/js/features/createRectangle/createRectangleInterface";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import { LatLngBoundsObject } from "../../../OpenStreetMap/js/types";
import EditImageOverlayFactory from "./edit/editImageOverlayDataFactory";
import { ImageOverlayBoundsAndRatioCalculatorInterface } from "./helper/imageOverlayBoundsAndRatioCalculatorInterface";
import { ImageOverlayResizeInterface } from "./imageFunctionality/imageOverlayResizeInterface";

class ImageOverlayData implements ImageOverlayDataInterface {
    private editor: EditImageOverlayDataInterface;
    private static idCounter = 0;
    private id = `image-overlay-${ImageOverlayData.idCounter++}`;
    private static imageOverlays: ImageOverlaysDataStorage = {};
    private title: string = '';
    private image: string = '';
    private layerGroup: string = '';
    private currentImageOverlay: null|ImageOverlayInterface = null;
    constructor(
        private mapInstance: MapInterface,
        private createImageOverlayInstance: CreateImageOverlayInterface,
        private createRectangle: CreateRectangleInterface,
        private createMarkerInstance: CreateMarkerInterface,
        private editImageOverlayFactoryInstance: EditImageOverlayFactory,
        private imageOverlaysListInstance: ImageOverlaysListInterface,
        private imageOverlayBoundsAndRatioCalculatorInstance: ImageOverlayBoundsAndRatioCalculatorInterface,
        private imageOverlayResizeInstance: ImageOverlayResizeInterface
    ) {
        this.editor = this.editImageOverlayFactoryInstance.create(this);
        // TODO: Remove when testing is done
        this.imageOverlaysListInstance.addItem(this);
        this.addImageToMap();
    }

    public removeImageFromMap() {
        if (this.currentImageOverlay) {
            this.currentImageOverlay.removeImageOverlay();
        }
    }

    public addImageToMap() {
        if (!ImageOverlayData.getImageOverlays()[this.getId()]) {
            ImageOverlayData.getImageOverlays()[this.getId()] = this;
        }

        this.imageOverlayBoundsAndRatioCalculatorInstance.calculateBounds("https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg", this.mapInstance.getCenter()).then(([bounds, aspectRatio]) => {
            const overlay = this.createImageOverlayInstance.create("https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg", bounds);

            overlay.addTo(this.mapInstance);
            this.currentImageOverlay = overlay;
            this.imageOverlayResizeInstance.createResize(overlay, bounds.northEast, aspectRatio);
        });
    }

    public editImageOverlay(): void {
        this.editor.edit();
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getTitle(): string {
        return this.title;
    }

    public setLayerGroup(layerGroup: string): void {
        this.layerGroup = layerGroup;
    }

    public getLayerGroup(): string {
        return this.layerGroup;
    }

    public setImage(image: string): void {
        const originalImage = this.getImage();
        this.image = image;

        if (image === originalImage) {
        } else if (!image && originalImage) {
            this.removeImageFromMap();
        } else if (image && !originalImage) {
            this.addImageToMap();
        } else if (image !== originalImage) {
            this.removeImageFromMap();
            this.addImageToMap();
        }
    }

    public getImage(): string {
        return this.image;
    }

    public updateImageOverlay(): void {
        this.imageOverlaysListInstance.updateItem(this);
    }

    public deleteImageOverlay(): void {
        if (ImageOverlayData.getImageOverlays()[this.getId()]) {
            delete ImageOverlayData.getImageOverlays()[this.getId()];
        }

        // Remove image overlay from map
    }

    public getId(): string {
        return this.id;
    }

    public static getImageOverlays(): ImageOverlaysDataStorage {
        return ImageOverlayData.imageOverlays;
    }

}

export default ImageOverlayData;