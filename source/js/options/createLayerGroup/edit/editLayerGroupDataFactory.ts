import { LayerGroupDataInterface } from "../layerGroupDataInterface";
import EditLayerGroupData from "./editLayerGroupData";

class EditLayerGroupDataFactory {
    constructor(
        private editInstance: EditInterface,
        private overlayInstance: OverlayInterface,
        private titleInstance: Field,
        private colorInstance: Field,
        private layerInstance: Field
    ) {}

    public create(layerGroupData: LayerGroupDataInterface): EditLayerGroupDataInterface {
        return new EditLayerGroupData(
            layerGroupData,
            this.editInstance,
            this.overlayInstance,
            this.titleInstance,
            this.colorInstance,
            this.layerInstance
        );
    }
}

export default EditLayerGroupDataFactory;