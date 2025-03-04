import { ImageOverlayInterface, CreateMarkerInterface, MarkerInterface, MapInterface, LatLngBoundsObject, LatLngObject } from "@helsingborg-stad/openstreetmap";
import { ImageOverlayMoveInterface } from "./imageOverlayMoveInterface";

class ImageOverlayMove implements ImageOverlayMoveInterface {
    constructor(        
        private mapInstance: MapInterface,
        private createMarkerInstance: CreateMarkerInterface
    ) {}

    public createMove(
        imageOverlay: ImageOverlayInterface,
        position: LatLngObject,
        resizeHandle: MarkerInterface
    ): MarkerInterface {
        const moveHandle = this.createMarkerInstance.create({
            draggable: true,
            position: position,
            icon: '<span style="font-size: 1rem; padding: .25rem; display: flex; justify-content: center; align-items: center; background-color: var(--acf-openstreetmap-color-primary,#199900); border-radius: 50%; color: white;" class="dashicons dashicons-move"></span>',
        });

        moveHandle.addTo(this.mapInstance);

        let startLatLng: null|LatLngObject = null;
        let startBounds: null|LatLngBoundsObject = null;

        moveHandle.addListener("dragstart", (event) => {
            if (!event.latLng) {
                return;
            }

            startLatLng = event.latLng;
            startBounds = imageOverlay.getPosition();
        });

        moveHandle.addListener("drag", (event) => {
            if (!event.latLng || !startLatLng || !startBounds) {
                return;
            }

            const deltaLat = event.latLng.lat - startLatLng.lat;
            const deltaLng = event.latLng.lng - startLatLng.lng;

            const newBounds = {
                southWest: {
                    lat: startBounds.southWest.lat + deltaLat,
                    lng: startBounds.southWest.lng + deltaLng
                },
                northEast: {
                    lat: startBounds.northEast.lat + deltaLat,
                    lng: startBounds.northEast.lng + deltaLng
                }
            };

            moveHandle.setPosition(newBounds.southWest);
            resizeHandle.setPosition(newBounds.northEast);
            imageOverlay.setPosition(newBounds);
        });

        return moveHandle;
    }
}

export default ImageOverlayMove;