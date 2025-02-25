import { MarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { LatLngObject } from "../../../OpenStreetMap/js/types";

interface MarkerDataInterface {
    createMarker(latlng: LatLngObject): MarkerInterface;
    editMarker(): void;
    setTitle(title: string): void;
    getTitle(): string;
    setDescription(content: string): void;
    getDescription(): string;
    setUrl(url: string): void;
    getUrl(): string;
    getId(): string;
    getMarker(): MarkerInterface|null;
}