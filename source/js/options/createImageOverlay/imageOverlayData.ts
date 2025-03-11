import { CreateImageOverlayInterface, ImageOverlayInterface, MapInterface, MarkerInterface, LatLngBoundsObject, LayerGroupInterface } from "@helsingborg-stad/openstreetmap";
import EditImageOverlayFactory from "./edit/editImageOverlayDataFactory";
import { ImageOverlayBoundsAndRatioCalculatorInterface } from "./helper/imageOverlayBoundsAndRatioCalculatorInterface";
import { ImageOverlayMoveInterface } from "./imageFunctionality/imageOverlayMoveInterface";
import { ImageOverlayResizeInterface } from "./imageFunctionality/imageOverlayResizeInterface";
import { ImageOverlayDataInterface, ImageOverlaysDataStorage } from "./imageOverlayDataInterface";
import LayerGroupData from "../createLayerGroup/layerGroupData";

class ImageOverlayData implements ImageOverlayDataInterface {
    private editor: EditImageOverlayDataInterface;
    private static idCounter = 0;
    private id = `image-overlay-${ImageOverlayData.idCounter++}`;
    private static imageOverlays: ImageOverlaysDataStorage = {};
    private title: string = '';
    private image: string = '';
    private layerGroup: string = '';
    private currentImageOverlay: null|ImageOverlayInterface = null;
    private currentMove: null|MarkerInterface = null;
    private currentResize: null|MarkerInterface = null;
    private aspectRatio: null|number = null;
    constructor(
        private mapInstance: MapInterface,
        private createImageOverlayInstance: CreateImageOverlayInterface,
        private editImageOverlayFactoryInstance: EditImageOverlayFactory,
        private imageOverlaysListInstance: ImageOverlaysListInterface,
        private imageOverlayBoundsAndRatioCalculatorInstance: ImageOverlayBoundsAndRatioCalculatorInterface,
        private imageOverlayResizeInstance: ImageOverlayResizeInterface,
        private imageOverlayMoveInstance: ImageOverlayMoveInterface
    ) {
        this.editor = this.editImageOverlayFactoryInstance.create(this);
        this.imageOverlaysListInstance.addItem(this);
    }

    public removePlacedImageOverlay() {
        if (this.currentImageOverlay) {
            this.currentImageOverlay.removeImageOverlay();
            this.currentImageOverlay = null;
        }

        if (this.currentMove) {
            this.currentMove.removeMarker();
            this.currentMove = null;
        }

        if (this.currentResize) {
            this.currentResize.removeMarker();
            this.currentResize = null;
        }

        delete ImageOverlayData.getImageOverlays()[this.getId()];
    }

    public updatePlacedImageOverlay(bounds: null|LatLngBoundsObject = null): void {
        if (bounds && this.getImageAspectRatio()) {
            this.addImage(bounds, this.getImageAspectRatio()!);
            return;
        }

        this.imageOverlayBoundsAndRatioCalculatorInstance.calculateBounds(this.getImage(), this.mapInstance.getCenter()).then(([bounds, aspectRatio]) => {
            this.addImage(bounds, aspectRatio);
        });
    }

    private addImage(bounds: LatLngBoundsObject, aspectRatio: number): void {
        if (!ImageOverlayData.getImageOverlays()[this.getId()]) {
            ImageOverlayData.getImageOverlays()[this.getId()] = this;
        }

        const overlay = this.createImageOverlayInstance.create({
            url: this.getImage(),
            bounds: bounds,
            interactive: true
        });

        overlay.addListener('click', (e) => {
            this.mapInstance.flyTo(overlay.getCenter());
            this.editImageOverlay();
        });
        this.currentImageOverlay = overlay;
        this.addImageOverlayToMap();
        this.setImageAspectRatio(aspectRatio);
        this.currentResize = this.imageOverlayResizeInstance.createResize(overlay, bounds.northEast, aspectRatio);
        this.currentMove = this.imageOverlayMoveInstance.createMove(overlay, bounds.southWest, this.currentResize);
    }

    public addImageOverlayToMap(): void {
        if (!this.getImageOverlay()) {
            return;
        }

        if (LayerGroupData.getLayerGroups()[this.getLayerGroup()]?.getLayer()) {
            return this.getImageOverlay()!.addTo(LayerGroupData.getLayerGroups()[this.getLayerGroup()]!.getLayer() as LayerGroupInterface);
        }

        return this.getImageOverlay()!.addTo(this.mapInstance);
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
        if (this.getLayerGroup() === layerGroup) {
            return;
        }

        this.layerGroup = layerGroup;
        this.addImageOverlayToMap();
    }

    public getLayerGroup(): string {
        return this.layerGroup;
    }

    public setImage(image: string, bounds: null|LatLngBoundsObject = null): void {
        const originalImage = this.getImage();
        this.image = image;

        if (image === originalImage) {
        } else if (!image && originalImage) {
            this.removePlacedImageOverlay();
        } else if (image && !originalImage) {
            this.updatePlacedImageOverlay(bounds);
        } else if (image !== originalImage) {
            this.removePlacedImageOverlay();
            this.updatePlacedImageOverlay(bounds);
        }
    }

    public getImage(): string {
        return this.image;
    }

    public updateImageOverlay(): void {
        this.imageOverlaysListInstance.updateItem(this);
    }

    public deleteImageOverlay(): void {
        this.imageOverlaysListInstance.removeItem(this);
        this.removePlacedImageOverlay();
    }

    public getImageOverlay(): ImageOverlayInterface|null {
        return this.currentImageOverlay;
    }

    public getImageAspectRatio(): number|null {
        return this.aspectRatio;
    }

    public setImageAspectRatio(aspectRatio: number): void {
        this.aspectRatio = aspectRatio;
    }

    public getId(): string {
        return this.id;
    }

    public static getImageOverlays(): ImageOverlaysDataStorage {
        return ImageOverlayData.imageOverlays;
    }
}

export default ImageOverlayData;