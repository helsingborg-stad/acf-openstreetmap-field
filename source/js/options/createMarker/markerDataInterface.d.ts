import { MarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { LatLngObject } from "../../../OpenStreetMap/js/types";

type MarkersDataStorage = { [id: string]: MarkerDataInterface };

interface MarkerDataInterface {
    createMarker(latlng: LatLngObject): MarkerInterface;
    editMarker(): void;
    deleteMarker(): void;
    updateMarker(): void;
    setTitle(title: string): void;
    getTitle(): string;
    setDescription(content: string): void;
    getDescription(): string;
    setLayerGroup(layerGroup: string): void;
    getLayerGroup(): string;
    setUrl(url: string): void;
    getUrl(): string;
    getId(): string;
    getMarker(): MarkerInterface|null;
}