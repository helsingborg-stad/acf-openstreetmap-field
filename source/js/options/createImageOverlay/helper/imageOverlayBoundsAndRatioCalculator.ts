import { LatLngBoundsObject, LatLngObject } from "../../../../OpenStreetMap/js/types";
import { ImageOverlayBoundsAndRatioCalculatorInterface } from "./imageOverlayBoundsAndRatioCalculatorInterface";

class ImageOverlayBoundsAndRatioCalculator implements ImageOverlayBoundsAndRatioCalculatorInterface {
    constructor() {}

    public calculateBounds(imageUrl: string, center: LatLngObject): Promise<[LatLngBoundsObject, number]> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imageUrl;
    
            img.onload = () => {
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                const width = 0.1;
                const height = width / aspectRatio;
                const lngOffset = (width / 2) / Math.cos(center.lat * (Math.PI / 180));

                const bounds: LatLngBoundsObject = {
                    southWest: {
                        lat: center.lat - height / 2,
                        lng: center.lng - lngOffset
                    },
                    northEast: {
                        lat: center.lat + height / 2,
                        lng: center.lng + lngOffset
                    }
                };

                resolve([bounds, aspectRatio]);
            };
            img.onerror = () => {
                reject(new Error("Failed to load image"))
            };
        });
    }
}

export default ImageOverlayBoundsAndRatioCalculator;