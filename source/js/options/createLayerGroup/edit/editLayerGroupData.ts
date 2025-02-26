import { LayerGroupDataInterface } from "../layerGroupDataInterface";

class EditLayerGroupData implements EditLayerGroupDataInterface, Editable {
    constructor(
        private layerGroupData: LayerGroupDataInterface,
        private editInstance: EditInterface,
        private overlayInstance: OverlayInterface,
        private titleInstance: Field,
    ) {
    }

    public edit(): void {
        this.editInstance.setActiveEditable(this);
        this.setDefaultFieldValues();
        this.show();
    }

    private setDefaultFieldValues(): void {
        this.titleInstance.setValue(this.layerGroupData.getTitle());
    }

    public save() {
    }

    public cancel() {
    }

    public delete() {
    }

    private show() {
        this.titleInstance.showField();
        this.overlayInstance.showOverlay();
    }
}

export default EditLayerGroupData;