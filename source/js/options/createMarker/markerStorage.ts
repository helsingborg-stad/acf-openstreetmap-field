import { MarkerDataInterface } from "./markerDataInterface";
import { MarkersListInterface } from "./markersListInterface";
import { MarkersDataStorage, MarkerStorageInterface } from "./markerStorageInterface";

class MarkerStorage implements MarkerStorageInterface {
    private markers: MarkersDataStorage = {};
    private activeMarker: MarkerDataInterface|null = null;

    constructor(private markersListInstance: MarkersListInterface) {}

    public getActiveMarker(): MarkerDataInterface|null {
        return this.activeMarker;
    }

    public setActiveMarker(markerData: MarkerDataInterface|null): void {
        this.activeMarker = markerData;
    }

    public deleteActiveMarker(): void {
        if (this.getActiveMarker()) {
            this.removeMarker(this.getActiveMarker()!.getId());
            this.getActiveMarker()!.getMarker()?.removeMarker();
            this.setActiveMarker(null);
        }
    }

    public getMarkers(): MarkersDataStorage {
        return this.markers;
    }

    public removeMarker(id: string) {
        if (!this.markers[id]) {
            return;
        }

        delete this.markers[id];
        this.markersListInstance.removeItem(this.markers[id]);
    }

    public addMarker(markerData: MarkerDataInterface) {
        this.markers[markerData.getId()] = markerData;
        this.markersListInstance.addItem(markerData);
    }
}

export default MarkerStorage;