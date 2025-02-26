
import { Addable } from "../../../OpenStreetMap/js/addableInterface";
import { CreateLayerGroupInterface } from "../../../OpenStreetMap/js/features/createLayerGroup/createLayerGroupInterface";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import EditLayerGroupDataFactory from "./edit/editLayerGroupDataFactory";
import LayerGroupData from "./layerGroupData";
import { LayerGroupsListInterface } from "./layerGroupsListInterface";

class LayerGroupFactory {
    constructor(
        private mapInstance: MapInterface&Addable,
        private createLayerGroupInstance: CreateLayerGroupInterface,
        private editLayerGroupDataFactoryInstance: EditLayerGroupDataFactory,
        private layerGroupsListInstance: LayerGroupsListInterface
    ) {
        
    }

    public create() {
        return new LayerGroupData(
            this.mapInstance,
            this.createLayerGroupInstance,
            this.editLayerGroupDataFactoryInstance,
            this.layerGroupsListInstance
        );
    }
}

export default LayerGroupFactory;