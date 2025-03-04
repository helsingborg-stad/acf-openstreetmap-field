import { ImageOverlayInterface } from "../../../../OpenStreetMap/js/features/createImageOverlay/imageOverlayInterface";
import { MarkerInterface } from "../../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { RectangleInterface } from "../../../../OpenStreetMap/js/features/createRectangle/rectangleInterface";
import { LatLngObject } from "../../../../OpenStreetMap/js/types";

interface ImageOverlayResizeInterface {
    createResize(
        imageOverlay: ImageOverlayInterface,
        position: LatLngObject,
        aspectRatio: number
    ): MarkerInterface;
}