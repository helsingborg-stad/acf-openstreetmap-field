import { MarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";

interface MarkerDataInterface {
    setTitle(title: string): void;
    getTitle(): string;
    setContent(content: string): void;
    getContent(): string;
    setUrl(url: string): void;
    getUrl(): string;
    getId(): string;
    getMarker(): MarkerInterface;
}