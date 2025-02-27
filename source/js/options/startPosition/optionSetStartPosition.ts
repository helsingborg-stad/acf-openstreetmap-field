import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import { MarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import { LatLngObject } from "../../../OpenStreetMap/js/types";
import { OptionSetStartPositionInterface } from "./optionSetStartPositionInterface";

class OptionSetStartPosition implements OptionFeature, OptionSetStartPositionInterface {
    protected condition: string = 'set_start_position';
    private markerCssClass: string = 'marker-start-position';
    private marker: undefined|MarkerInterface;

    constructor(
        private mapInstance: MapInterface,
        private handleSelectedInstance: HandleSelectedInterface,
        private createMarkerInstance: CreateMarkerInterface
    ) {
        this.mapInstance.addListener('click', (e: any) => {
            if (
                this.handleSelectedInstance.getCurrentSelectedValue() !== this.condition ||
                e.originalEvent.target.classList.contains(this.markerCssClass)) {
                return;
            }

            if (this.marker) {
                this.marker.setPosition(e.latlng);
            } else {
                this.addMarker(e.latlng);
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
        return `<span style="color: #00B6FF; font-size: 40px;" class="${this.markerCssClass} dashicons dashicons-location"></span>`;
    }

    public checkCondition(value: string): boolean {
        return value === this.condition;
    }
}

export default OptionSetStartPosition;