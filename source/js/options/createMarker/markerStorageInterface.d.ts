import { MarkerDataInterface } from "./markerDataInterface";

type MarkersDataStorage = { [id: string]: MarkerDataInterface };

interface MarkerStorageInterface {
    getActiveMarker(): MarkerDataInterface|null;
    setActiveMarker(markerData: MarkerDataInterface|null): void;
    getMarkers(): MarkersDataStorage;
    removeMarker(id: string)
    deleteActiveMarker(): void;
    addMarker(markerData: MarkerDataInterface): void;
}