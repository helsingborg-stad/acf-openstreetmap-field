import { MapInterface, CreateMarkerInterface, MarkerInterface, LatLngObject } from "@helsingborg-stad/openstreetmap";
import { OptionSetStartPositionInterface } from "./optionSetStartPositionInterface";
import ListItemHelper from "../../helper/createListItem";
import { Setting } from "../settings/setting";

class OptionSetStartPosition implements OptionSetStartPositionInterface {
    private markerCssClass: string = 'marker-start-position';
    private marker: undefined|MarkerInterface;

    constructor(
        private mapInstance: MapInterface,
        private container: HTMLElement,
        private zoomInstance: Setting,
        private handleSelectedInstance: HandleSelectedInterface,
        private createMarkerInstance: CreateMarkerInterface,
        private iconFactoryInstance: IconFactoryInterface,
        private listItemHelper: ListItemHelper
    ) {
        this.container.querySelector('[acf-openstreetmap-set-start-position]')?.addEventListener('click', () => {
            if (this.marker) {
                this.marker.setPosition(this.mapInstance.getCenter());
            } else {
                this.addMarker(this.mapInstance.getCenter());
            }
        });
    }

    public addMarker(latlng: LatLngObject): void {
        if (this.marker) {
            return;
        }

        this.marker = this.createMarkerInstance.create({
            position: latlng,
            html: this.getMarkerMarkup(),
            draggable: true,
            iconSize: [32, 32],
            iconAnchor: [32, 32],
            className: this.markerCssClass
        });

        this.marker.addTo(this.mapInstance);
    }

    public getStartPositionMarker(): MarkerInterface|undefined {
        return this.marker;
    }

    private getMarkerMarkup(): string {
        return this.iconFactoryInstance.create('location', '#199900', 24);
    }
}

export default OptionSetStartPosition;