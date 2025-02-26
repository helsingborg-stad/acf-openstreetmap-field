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
        this.setDefaultFieldValues();
        this.show();
    }

    private setDefaultFieldValues(): void {
        this.titleInstance.setValue(this.layerGroupData.getTitle());
    }

    public save() {
        this.layerGroupData.setTitle(this.titleInstance.getValue());
        this.layerGroupData.updateLayerGroup();
        this.hide();
    }

    public cancel() {
        this.hide();
    }

    public delete() {
        this.layerGroupData.deleteLayerGroup();
        this.hide();
    }

    private hide() {
        this.editInstance.setActiveEditable(null);
        this.titleInstance.hideField();
        this.overlayInstance.hideOverlay();
    }

    private show() {
        this.editInstance.setActiveEditable(this);
        this.titleInstance.showField();
        this.overlayInstance.showOverlay();
    }
}

export default EditLayerGroupData;