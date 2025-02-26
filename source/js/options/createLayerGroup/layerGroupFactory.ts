import LayerGroupData from "./layerGroupData";

class LayerGroupFactory {
    public create() {
        return new LayerGroupData();
    }
}

export default LayerGroupFactory;