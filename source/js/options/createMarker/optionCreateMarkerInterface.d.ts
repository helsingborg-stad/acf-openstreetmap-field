import { MarkerDataInterface } from "./markerDataInterface";

type MarkersDataInterface = { [id: string]: MarkerDataInterface };

interface OptionCreateMarkerInterface {
    getMarkers(): MarkersDataInterface;
    addMarker(marker: MarkerInterface): MarkerDataInterface;
    removeMarker(id: string): void;
}