class EditImageOverlayData implements EditImageOverlayDataInterface, Editable {
    constructor(
        private imageOverlayData: ImageOverlayDataInterface,
        private editInstance: EditInterface,
        private overlayInstance: OverlayInterface,
        private titleInstance: Field,
        private layerInstance: Field,
        private imageInstance: Field
    ) {
        // this.option = document.createElement('option');
        // this.option.value = this.imageOverlayData.getId();
        // this.layerInstance.getField()?.appendChild(this.option);
    }

    public edit(): void {
        this.editInstance.setActiveEditable(this);
        this.showFields();
    }

    private setDefaultFieldValues(): void {
        // this.titleInstance.setValue(this.imageOverlayData.getTitle());
        // this.colorInstance.setValue(this.imageOverlayData.getColor());
        // this.layerInstance.setValue(this.imageOverlayData.getLayerGroup());
        // this.iconInstance.setValue(this.imageOverlayData.getIcon());
    }

    public save() {
        // if (this.imageOverlayData.getId() === this.layerInstance.getValue()) {
        //     alert('Cannot set the layer group to itself');
        //     return;
        // }

        // this.imageOverlayData.setTitle(this.titleInstance.getValue());
        // this.imageOverlayData.setColor(this.colorInstance.getValue());
        // this.imageOverlayData.setLayerGroup(this.layerInstance.getValue());
        // this.imageOverlayData.setIcon(this.iconInstance.getValue());
        // this.imageOverlayData.updateLayerGroup();
        // this.editInstance.setActiveEditable(null);
        // this.hideFields();
    }
    
    public setOptionTitle(title: string) {
        // this.option.text = this.imageOverlayData.getTitle();
    }

    public cancel() {
        // this.editInstance.setActiveEditable(null);
        // this.hideFields();
    }

    public delete() {
        // this.imageOverlayData.deleteLayerGroup();
        // this.editInstance.setActiveEditable(null);
        // this.option.remove();
        // this.hideFields();
    }

    public showFields() {
        this.layerInstance.showField();
        this.titleInstance.showField();
        this.imageInstance.showField();
        this.overlayInstance.showOverlay();
    }

    public hideFields() {
        this.layerInstance.hideField();
        this.titleInstance.hideField();
        this.imageInstance.hideField();
        this.overlayInstance.hideOverlay();
    }
}

export default EditImageOverlayData;