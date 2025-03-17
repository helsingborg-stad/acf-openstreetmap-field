import { MapInterface } from "@helsingborg-stad/openstreetmap";
import { MarkerFactoryInterface } from "./markerFactoryInterface";
import LayerGroupData from "../createLayerGroup/layerGroupData";

class OptionCreateMarker {
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
            if (e.originalEvent.target.classList.contains(this.markerCssClass)) {
                return;
            }

            if (e.latLng) {
                const markerData = this.markerFactoryInstance.create();
                if (LayerGroupData.getActiveLayerGroup()?.getId()) {
                    markerData.setLayerGroup(LayerGroupData.getActiveLayerGroup()!.getId());
                }
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