import { CreateMarker } from "../../../OpenStreetMap/js/features/createMarker/createMarker";
import Marker from "../../../OpenStreetMap/js/features/createMarker/marker";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";

class OptionSetStartPosition implements OptionFeature {
    protected condition: string = 'set_start_position';
    private marker: undefined|Marker;
    private markerCssClass: string = 'marker-start-position'

    constructor(
        private mapInstance: MapInterface,
        private handleSelectedInstance: HandleSelectedInterface,
        private createMarkerInstance: CreateMarker
    ) {
        this.mapInstance.addListener('click', (e: any) => {
            if (
                this.handleSelectedInstance.getCurrentSelectedValue() !== this.condition ||
                e.originalEvent.target.classList.contains(this.markerCssClass)
            ) {
                return;
            }
            if (this.marker) {
                this.marker.setPosition(e.latlng);
            } else {
                this.marker = this.createMarkerInstance.create({
                    position: e.latlng,
                    icon: this.getMarkerMarkup(),
                    className: 'marker'
                });
            }
        })
    }

    // TODO: Make this look nice
    private getMarkerMarkup(): string {
        return `<div class="${this.markerCssClass}" style="color: blue; font-weight: bold; font-size: 18px;">S</div>`;
    }

    public checkCondition(value: string): boolean {
        return value === this.condition;
    }
}

export default OptionSetStartPosition;