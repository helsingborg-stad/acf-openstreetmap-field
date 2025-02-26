
import { CreateLayerGroupInterface } from "../../../OpenStreetMap/js/features/createLayerGroup/createLayerGroupInterface";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import EditLayerGroupDataFactory from "./edit/editLayerGroupDataFactory";
import LayerGroupData from "./layerGroupData";

class LayerGroupFactory {
    constructor(
        private mapInstance: MapInterface,
        private createLayerGroupInstance: CreateLayerGroupInterface,
        private editLayerGroupDataFactoryInstance: EditLayerGroupDataFactory
    ) {
        
    }

    public create() {
        return new LayerGroupData(
            this.mapInstance,
            this.createLayerGroupInstance,
            this.editLayerGroupDataFactoryInstance
        );
    }
}

export default LayerGroupFactory;