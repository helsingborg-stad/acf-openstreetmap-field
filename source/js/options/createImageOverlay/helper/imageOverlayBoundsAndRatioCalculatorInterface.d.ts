import { LatLngBoundsObject, LatLngObject } from "../../../../OpenStreetMap/js/types";

interface ImageOverlayBoundsAndRatioCalculatorInterface {
    calculateBounds(imageUrl: string, center: LatLngObject): Promise<[LatLngBoundsObject, number]>;
}