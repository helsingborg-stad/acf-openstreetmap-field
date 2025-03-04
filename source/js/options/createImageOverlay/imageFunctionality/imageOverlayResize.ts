import { ImageOverlayInterface } from "../../../../OpenStreetMap/js/features/createImageOverlay/imageOverlayInterface";
import { CreateMarkerInterface } from "../../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import { MarkerInterface } from "../../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { MapInterface } from "../../../../OpenStreetMap/js/mapInterface";
import { LatLngObject } from "../../../../OpenStreetMap/js/types";
import { ImageOverlayResizeInterface } from "./imageOverlayResizeInterface";

class ImageOverlayResize implements ImageOverlayResizeInterface {
    constructor(
        private mapInstance: MapInterface,
        private createMarkerInstance: CreateMarkerInterface
    ) {}

    public createResize(imageOverlay: ImageOverlayInterface, position: LatLngObject, aspectRatio: number): MarkerInterface {
        const resizeHandle = this.createMarkerInstance.create({
            draggable: true,
            position: position,
            icon: '<span style="font-size: 1rem; padding: .25rem; display: flex; justify-content: center; align-items: center; background-color: var(--acf-openstreetmap-color-primary,#199900); border-radius: 50%; color: white;" class="dashicons dashicons-leftright"></span>',
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

        return resizeHandle;
    }
}

export default ImageOverlayResize;