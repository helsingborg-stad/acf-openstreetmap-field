import { CreateMarker } from "../../../OpenStreetMap/js/features/createMarker/createMarker";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";

class OptionCreateMarker implements OptionFeature {
    protected condition: string = 'create_marker';

    constructor(
        private mapInstance: MapInterface,
        private handleSelectedInstance: HandleSelectedInterface,
        private createMarkerInstance: CreateMarker
    ) {

    }

    public checkCondition(value: string): boolean {
        return value === this.condition;
    }
}

export default OptionCreateMarker;