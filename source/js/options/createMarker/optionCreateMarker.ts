import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import { MarkerFactoryInterface } from "./markerFactoryInterface";

class OptionCreateMarker implements OptionFeature {
    protected condition: string = 'create_marker';
    private markerCssClass: string = 'marker-create';

    constructor(
        private mapInstance: MapInterface,
        private handleSelectedInstance: HandleSelectedInterface,
        private markerFactoryInstance: MarkerFactoryInterface

    ) {
        this.addListener();
    }

    private addListener(): void {
        this.mapInstance.addListener('click', (e) => {
            if (this.handleSelectedInstance.getCurrentSelectedValue() !== this.condition ||
                e.originalEvent.target.classList.contains(this.markerCssClass)) {
                return;
            }

            if (e.latLng) {
                const markerData = this.markerFactoryInstance.create();
                markerData.createMarker(e.latLng);
                markerData.editMarker();
            }
        });
    }

    public checkCondition(value: string): boolean {
        return value === this.condition;
    }
}

export default OptionCreateMarker;