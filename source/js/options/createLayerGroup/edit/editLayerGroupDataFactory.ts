import EditLayerGroupData from "./editLayerGroupData";

class EditLayerGroupDataFactory {
    public create(layerGroupData: LayerGroupDataInterface): EditLayerGroupDataInterface {
        return new EditLayerGroupData(
            layerGroupData
        );
    }
}

export default EditLayerGroupDataFactory;