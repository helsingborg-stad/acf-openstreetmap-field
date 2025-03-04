import { MapInterface } from "@helsingborg-stad/openstreetmap";
import { MarkerDataInterface } from "./markerDataInterface";
import { MarkersListDataStorage, MarkersListInterface } from "./markersListInterface";
import { createListItem } from "../../helper/createListItem";

class MarkersList implements MarkersListInterface {
    markersList: HTMLElement|null;
    listedMarkers: MarkersListDataStorage = {};
    constructor(private container: HTMLElement, private mapInstance: MapInterface) {
        this.markersList = this.container.querySelector('[data-js-markers-list]');
    }

    public addItem(markerData: MarkerDataInterface): void {
        const listItem = createListItem(this.getMarkerDataTitle(markerData));
        this.markersList?.appendChild(listItem);
        this.listedMarkers[markerData.getId()] = {marker: markerData, listItem: listItem};
        this.setClickListener(listItem, markerData);
    }
    
    public removeItem(markerData: MarkerDataInterface): void {
        this.listedMarkers[markerData.getId()]?.listItem.remove();
        delete this.listedMarkers[markerData.getId()];
    }

    public updateItem(markerData: MarkerDataInterface): void {
        if (!this.listedMarkers[markerData.getId()].listItem) {
            return;
        }

        this.listedMarkers[markerData.getId()].listItem.querySelector('span')!.textContent = this.getMarkerDataTitle(markerData);
    }

    private setClickListener(listItem: HTMLLIElement, markerData: MarkerDataInterface): void {
        listItem.addEventListener('click', () => {
            markerData.editMarker();
            if (!markerData.getMarker()) {
                return;
            }

            this.mapInstance.flyTo(markerData.getMarker()!.getPosition(), 17);
        });
    }

    private getMarkerDataTitle(markerData: MarkerDataInterface): string {
        return markerData.getTitle() ? markerData.getTitle() : 'Untitled Marker';
    }
}

export default MarkersList;