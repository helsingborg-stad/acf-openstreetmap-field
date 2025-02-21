import { MarkerDataInterface } from "./markerDataInterface";

type MarkersDataInterface = { [id: string]: MarkerDataInterface };

interface OptionCreateMarkerInterface {
    getMarkers(): MarkersDataInterface;
    addMarker(marker: MarkerInterface): void;
    removeMarker(id: string): void;
}