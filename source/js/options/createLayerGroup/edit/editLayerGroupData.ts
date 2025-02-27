import { LayerGroupDataInterface } from "../layerGroupDataInterface";

class EditLayerGroupData implements EditLayerGroupDataInterface, Editable {
    constructor(
        private layerGroupData: LayerGroupDataInterface,
        private editInstance: EditInterface,
        private overlayInstance: OverlayInterface,
        private titleInstance: Field,
        private colorInstance: Field
    ) {
    }

    public edit(): void {
        this.setDefaultFieldValues();
        this.editInstance.setActiveEditable(this);
        this.showFields();
    }

    private setDefaultFieldValues(): void {
        this.titleInstance.setValue(this.layerGroupData.getTitle());
    }

    public save() {
        this.layerGroupData.setTitle(this.titleInstance.getValue());
        // this.layerGroupData.setColor(this.colorInstance.getValue());
        this.layerGroupData.updateLayerGroup();
        this.editInstance.setActiveEditable(null);
        this.hideFields();
    }

    public cancel() {
        this.editInstance.setActiveEditable(null);
        this.hideFields();
    }

    public delete() {
        this.layerGroupData.deleteLayerGroup();
        this.editInstance.setActiveEditable(null);
        this.hideFields();
    }

    public hideFields() {
        this.titleInstance.hideField();
        this.colorInstance.hideField();
        this.overlayInstance.hideOverlay();
    }

    public showFields() {
        this.titleInstance.showField();
        this.colorInstance.showField();
        this.overlayInstance.showOverlay();
    }
}

export default EditLayerGroupData;