import { MarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";

class MarkerData {
    private title: string = '';
    private content: string = '';
    private url: string = '';
    private constructor(private marker: MarkerInterface, private id: string) {
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getTitle(): string {
        return this.title;
    }

    public setContent(content: string): void {
        this.content = content;
    }

    public getContent(): string {
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

    public getMarker(): MarkerInterface {
        return this.marker;
    }
}

export default MarkerData;