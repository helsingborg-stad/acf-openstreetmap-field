import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import { MarkerFactoryInterface } from "./markerFactoryInterface";
import { MarkersDataInterface, MarkersInterface } from "./markersInterface";
import { LatLngObject } from "../../../OpenStreetMap/js/types";
import { MarkerDataInterface } from "./markerDataInterface";

class OptionCreateMarker implements OptionFeature {
    protected condition: string = 'create_marker';
    private markerCssClass: string = 'marker-create';

    constructor(
        private mapInstance: MapInterface,
        private handleSelectedInstance: HandleSelectedInterface,
        private markersInstance: MarkersInterface

    ) {
        this.addListener();
    }

    private addListener(): void {
        this.mapInstance.addListener('click', (e: any) => {
            if (this.handleSelectedInstance.getCurrentSelectedValue() !== this.condition ||
                e.originalEvent.target.classList.contains(this.markerCssClass)) {
                return;
            }

            this.markersInstance.addMarker(e.latlng);
        });
    }

    public checkCondition(value: string): boolean {
        return value === this.condition;
    }
}

export default OptionCreateMarker;