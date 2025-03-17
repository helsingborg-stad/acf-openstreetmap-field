import { LayerGroupFactoryInterface } from "./layerGroupFactoryInterface";

class OptionCreateLayerGroup {
    protected condition: string = 'create_layer_group';
    constructor(
        private container: HTMLElement,
        private handleSelectedInstance: HandleSelectedInterface,
        private layerGroupFactoryInstance: LayerGroupFactoryInterface

    ) {
        this.addListener();
    }

    private addListener() {
        this.container.querySelector(`[data-js-value="${this.condition}"]`)?.addEventListener('click', (e) => {
            e.preventDefault();
            
            const layerGroupDataInstance = this.layerGroupFactoryInstance.create();
            layerGroupDataInstance.createLayerGroup();
            layerGroupDataInstance.editLayerGroup();
            this.handleSelectedInstance.clearSelected();
        });
    }
}

export default OptionCreateLayerGroup;