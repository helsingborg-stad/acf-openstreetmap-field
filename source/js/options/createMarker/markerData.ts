import { MarkerInterface as Marker } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { EditMarkerDataInterface } from "./edit/editMarkerDataInterface";
import { MarkerDataInterface } from "./markerDataInterface";

class MarkerData implements MarkerDataInterface {
    private title: string = '';
    private content: string = '';
    private url: string = '';
    constructor(
        private marker: Marker,
        private id: string,
    ) {
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getTitle(): string {
        return this.title;
    }

    public setDescription(content: string): void {
        this.content = content;
    }

    public getDescription(): string {
        return this.content
    }

    public setUrl(url: string): void {
        this.url = url;
    }

    public getUrl(): string {
        return this.url;
    }

    public getId(): string {
        return this.id;
    }

    public getMarker(): Marker {
        return this.marker;
    }
}

export default MarkerData;