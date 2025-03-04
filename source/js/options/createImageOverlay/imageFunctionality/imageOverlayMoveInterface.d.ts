import { ImageOverlayInterface, MarkerInterface, LatLngObject } from "@helsingborg-stad/openstreetmap";

interface ImageOverlayMoveInterface {
    createMove(
        imageOverlay: ImageOverlayInterface,
        position: LatLngObject,
        resizeHandle: MarkerInterface
    ): MarkerInterface;
}