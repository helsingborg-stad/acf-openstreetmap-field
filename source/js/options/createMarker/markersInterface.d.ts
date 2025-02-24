import { MarkerDataInterface } from "./markerDataInterface";

type MarkersDataInterface = { [id: string]: MarkerDataInterface };

interface MarkersInterface {
    setCurrentMarker(marker: MarkerDataInterface|null): void;
    getCurrentMarker(): MarkerDataInterface|null;
    getMarkers(): MarkersDataInterface;
    addMarker(marker: MarkerInterface): MarkerDataInterface;
    removeMarker(id: string): void;
}