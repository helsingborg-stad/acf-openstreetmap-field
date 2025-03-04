import { ImageOverlayInterface } from "../../../../OpenStreetMap/js/features/createImageOverlay/imageOverlayInterface";
import { MarkerInterface } from "../../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { LatLngObject } from "../../../../OpenStreetMap/js/types";

interface ImageOverlayMoveInterface {
    createMove(
        imageOverlay: ImageOverlayInterface,
        position: LatLngObject,
        resizeHandle: MarkerInterface
    ): MarkerInterface;
}