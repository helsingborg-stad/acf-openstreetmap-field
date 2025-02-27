import { CreateLayerGroupInterface } from "../../../OpenStreetMap/js/features/createLayerGroup/createLayerGroupInterface";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import EditLayerGroupDataFactory from "./edit/editLayerGroupDataFactory";
import LayerGroupData from "./layerGroupData";
import { LayerGroupsListInterface } from "./layerGroupsListInterface";

class LayerGroupFactory {
    private static idCounter: number = 0;

    constructor(
        private mapInstance: MapInterface,
        private createLayerGroupInstance: CreateLayerGroupInterface,
        private editLayerGroupDataFactoryInstance: EditLayerGroupDataFactory,
        private layerGroupsListInstance: LayerGroupsListInterface,
    ) {

    }

    public create(id?: string) {
        if (!id || id === '') {
            id = 'layer-group-' + Date.now() + LayerGroupFactory.idCounter++;
        }

        return new LayerGroupData(
            id,
            this.mapInstance,
            this.createLayerGroupInstance,
            this.editLayerGroupDataFactoryInstance,
            this.layerGroupsListInstance
        );
    }
}

export default LayerGroupFactory;