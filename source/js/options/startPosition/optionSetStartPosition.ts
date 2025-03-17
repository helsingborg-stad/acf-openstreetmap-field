import { MapInterface, CreateMarkerInterface, MarkerInterface, LatLngObject } from "@helsingborg-stad/openstreetmap";
import { OptionSetStartPositionInterface } from "./optionSetStartPositionInterface";
import { OptionFeature } from "../optionFeature";
import ListItemHelper from "../../helper/createListItem";
import { Setting } from "../settings/setting";

class OptionSetStartPosition implements OptionFeature, OptionSetStartPositionInterface {
    protected condition: string = 'set_start_position';
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
        this.mapInstance.addListener('click', (e) => {
            if (
                this.handleSelectedInstance.getCurrentSelectedValue() !== this.condition ||
                e.originalEvent?.target.classList.contains(this.markerCssClass) ||
                !e.latLng) {
                return;
            }

            if (this.marker) {
                this.marker.setPosition(e.latLng);
            } else {
                this.addMarker(e.latLng);
            }
        })
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

    public checkCondition(value: string): boolean {
        return value === this.condition;
    }
}

export default OptionSetStartPosition;