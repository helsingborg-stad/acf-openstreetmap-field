import { MapInterface, CreateMarkerInterface, MarkerInterface, LatLngObject } from "@helsingborg-stad/openstreetmap";
import { OptionSetStartPositionInterface } from "./optionSetStartPositionInterface";
import { OptionFeature } from "../optionFeature";
import { createListItem } from "../../helper/createListItem";

class OptionSetStartPosition implements OptionFeature, OptionSetStartPositionInterface {
    protected condition: string = 'set_start_position';
    private markerCssClass: string = 'marker-start-position';
    private marker: undefined|MarkerInterface;
    private list: HTMLUListElement|null;

    constructor(
        private mapInstance: MapInterface,
        private container: HTMLElement,
        private zoomInstance: Setting,
        private handleSelectedInstance: HandleSelectedInterface,
        private createMarkerInstance: CreateMarkerInterface
    ) {
        this.list = this.container.querySelector('[data-js-start-position-list]');

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
            icon: this.getMarkerMarkup(),
            draggable: true,
        });

        this.addListItem();
        this.marker.addTo(this.mapInstance);
    }

    private addListItem(): void {
        if (!this.list) {
            return;
        }

        const listItem = createListItem('Start position');
        this.list.appendChild(listItem);

        listItem.addEventListener('click', () => {
            if (this.marker) {
                this.mapInstance.flyTo(this.marker.getPosition(), parseInt(this.zoomInstance.getValue()));
            }
        });
    }

    public getStartPositionMarker(): MarkerInterface|undefined {
        return this.marker;
    }

    // TODO: Make this look nice
    private getMarkerMarkup(): string {
        return `<span style="background-color: #199900; font-size: 24px; padding: 4px; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;" class="${this.markerCssClass} dashicons dashicons-location"></span>`;
    }

    public checkCondition(value: string): boolean {
        return value === this.condition;
    }
}

export default OptionSetStartPosition;