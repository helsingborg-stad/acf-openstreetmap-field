import { CreateLayerGroupInterface } from "../../../OpenStreetMap/js/features/createLayerGroup/createLayerGroupInterface";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import EditLayerGroupDataFactory from "./edit/editLayerGroupDataFactory";

class LayerGroupData {
    private static layerGroups: LayerGroupsDataStorage = {};
    constructor(
        private mapInstance: MapInterface,
        private createLayerGroupInstance: CreateLayerGroupInterface,
        private editLayerGroupDataFactoryInstance: EditLayerGroupDataFactory
    ) {
        const layer = createLayerGroupInstance.create();
        // layer.addTo(mapInstance.getMap());
    }
}

export default LayerGroupData;