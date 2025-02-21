import { MarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";

interface MarkerDataInterface {
    save(): void;
    setTitle(title: string): void;
    getTitle(): string;
    setDescription(content: string): void;
    getDescription(): string;
    setUrl(url: string): void;
    getUrl(): string;
    getId(): string;
    getMarker(): MarkerInterface;
}