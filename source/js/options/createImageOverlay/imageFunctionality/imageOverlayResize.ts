import { ImageOverlayInterface, CreateMarkerInterface, MarkerInterface, MapInterface, LatLngObject, LayerGroupInterface } from "@helsingborg-stad/openstreetmap";
import { ImageOverlayResizeInterface } from "./imageOverlayResizeInterface";

class ImageOverlayResize implements ImageOverlayResizeInterface {
    private resizeHandle: MarkerInterface|null = null;
    constructor(
        private mapInstance: MapInterface,
        private createMarkerInstance: CreateMarkerInterface
    ) {}

    public createResize(
        imageOverlay: ImageOverlayInterface,
        position: LatLngObject,
        aspectRatio: number,
        layerGroup: LayerGroupInterface|null = null
    ): MarkerInterface {
        this.resizeHandle = this.createMarkerInstance.create({
            draggable: true,
            position: position,
            html: '<span style="font-size: 1rem; padding: .25rem; display: flex; justify-content: center; align-items: center; background-color: var(--acf-openstreetmap-color-primary,#199900); border-radius: 50%; color: white;" class="dashicons dashicons-leftright"></span>',
        });

        this.resizeHandle.addTo(this.mapInstance);

        this.addMarkerToMap(layerGroup);

        this.resizeHandle.addListener("dragstart", (event) => {
            imageOverlay.setOpacity(0.5);
        });

        this.resizeHandle.addListener("drag", (event) => {
            if (!event.latLng) {
                return;
            }
            const newLatLng = event.latLng;
        
            const currentBounds = imageOverlay.getPosition();
            const fixedCorner = currentBounds.southWest;
        
            const newWidth = newLatLng.lng - fixedCorner.lng;
            const latScalingFactor = Math.cos(fixedCorner.lat * (Math.PI / 180)); 
            const newHeight = (newWidth / aspectRatio) * latScalingFactor;

            const newTopRight = {
                lat: fixedCorner.lat + newHeight,
                lng: newLatLng.lng
            };

            imageOverlay.setPosition({
                southWest: fixedCorner,
                northEast: newTopRight
            });

            this.resizeHandle!.setPosition(newTopRight);
        });

        this.resizeHandle.addListener("dragend", (event) => {
            imageOverlay.setOpacity(1);
        });

        return this.resizeHandle;
    }

    public addMarkerToMap(layerGroup: LayerGroupInterface|null = null): void {
        this.resizeHandle?.addTo(layerGroup ?? this.mapInstance);
    }
}

export default ImageOverlayResize;