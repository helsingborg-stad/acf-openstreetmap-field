import { LayerGroupDataInterface } from "./layerGroupDataInterface";
import { createListItem } from "../../helper/createListItem";

class LayerGroupsList implements LayerGroupsListInterface {
    layerGroupsList: HTMLElement|null;
    listedLayerGroups  = {};
    constructor(private container: HTMLElement) {
        this.layerGroupsList = this.container.querySelector('[data-js-layer-group-list]');
    }

    public addItem(layerGroupData: LayerGroupDataInterface): void {
        
    }

    public removeItem(layerGroupData: LayerGroupDataInterface): void {
        
    }

    public updateItem(layerGroupData: LayerGroupDataInterface): void {
        
    }
}

export default LayerGroupsList;