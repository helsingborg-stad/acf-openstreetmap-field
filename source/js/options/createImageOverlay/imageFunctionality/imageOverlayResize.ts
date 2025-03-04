import { ImageOverlayInterface } from "../../../../OpenStreetMap/js/features/createImageOverlay/imageOverlayInterface";
import { CreateMarkerInterface } from "../../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import { MarkerInterface } from "../../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { RectangleInterface } from "../../../../OpenStreetMap/js/features/createRectangle/rectangleInterface";
import { MapInterface } from "../../../../OpenStreetMap/js/mapInterface";
import { LatLngObject } from "../../../../OpenStreetMap/js/types";
import { ImageOverlayResizeInterface } from "./imageOverlayResizeInterface";

class ImageOverlayResize implements ImageOverlayResizeInterface {
    constructor(
        private mapInstance: MapInterface,
        private createMarkerInstance: CreateMarkerInterface
    ) {}

    public createResize(imageOverlay: ImageOverlayInterface, position: LatLngObject, aspectRatio: number): void {
        const resizeHandle = this.createMarkerInstance.create({
            draggable: true,
            position: position,
            icon: '<div class="resize-handle-inner">HEJ</div>',
        });

        resizeHandle.addTo(this.mapInstance);
        resizeHandle.addListener("drag", (event) => {
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
        
            resizeHandle.setPosition(newTopRight);
        });
    }
}

export default ImageOverlayResize;