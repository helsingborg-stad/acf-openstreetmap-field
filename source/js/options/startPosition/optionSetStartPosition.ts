import { MapInterface, CreateMarkerInterface, MarkerInterface, LatLngObject } from "@helsingborg-stad/openstreetmap";
import { OptionSetStartPositionInterface } from "./optionSetStartPositionInterface";
import { OptionFeature } from "../optionFeature";

class OptionSetStartPosition implements OptionFeature, OptionSetStartPositionInterface {
    protected condition: string = 'set_start_position';
    private markerCssClass: string = 'marker-start-position';
    private marker: undefined|MarkerInterface;

    constructor(
        private mapInstance: MapInterface,
        private handleSelectedInstance: HandleSelectedInterface,
        private createMarkerInstance: CreateMarkerInterface
    ) {
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
        this.marker = this.createMarkerInstance.create({
            position: latlng,
            icon: this.getMarkerMarkup(),
            draggable: true,
        });

        this.marker.addTo(this.mapInstance);
    }

    public getStartPosition(): MarkerInterface|undefined {
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