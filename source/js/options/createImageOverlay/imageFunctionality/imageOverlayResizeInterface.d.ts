import { ImageOverlayInterface, MarkerInterface, LatLngObject } from "@helsingborg-stad/openstreetmap";

interface ImageOverlayResizeInterface {
    createResize(
        imageOverlay: ImageOverlayInterface,
        position: LatLngObject,
        aspectRatio: number
    ): MarkerInterface;
}