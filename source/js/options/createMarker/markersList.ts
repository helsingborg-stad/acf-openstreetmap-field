import { MapInterface } from "@helsingborg-stad/openstreetmap";
import { MarkerDataInterface } from "./markerDataInterface";
import { MarkersListDataStorage, MarkersListInterface } from "./markersListInterface";
import ListItemHelper from "../../helper/createListItem";

class MarkersList implements MarkersListInterface {
    markersList: HTMLElement|null;
    listedMarkers: MarkersListDataStorage = {};
    layerAttribute: string = 'data-js-layer-group';
    constructor(
        private container: HTMLElement,
        private mapInstance: MapInterface,
        private listItemHelper: ListItemHelper
    ) {
        this.markersList = this.container.querySelector('[data-js-markers-list]');
    }

    public addItem(markerData: MarkerDataInterface): void {
        const listItem = this.listItemHelper.createListItem(this.getMarkerDataTitle(markerData));
        if (markerData.getLayerGroup()) {
            listItem.setAttribute(this.layerAttribute, markerData.getLayerGroup());
            listItem.style.order = '2';
        }

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

        if (markerData.getLayerGroup()) {
            this.listedMarkers[markerData.getId()].listItem.setAttribute(this.layerAttribute, markerData.getLayerGroup());
            this.listedMarkers[markerData.getId()].listItem.style.order = '2';
        } else {
            this.listedMarkers[markerData.getId()].listItem.removeAttribute(this.layerAttribute);
            this.listedMarkers[markerData.getId()].listItem.style.order = '';
        }
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