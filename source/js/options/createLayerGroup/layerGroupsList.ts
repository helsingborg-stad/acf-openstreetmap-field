import { LayerGroupDataInterface } from "./layerGroupDataInterface";
import { createListItem } from "../../helper/createListItem";
import { LayerGroupsListInterface, LayerGroupsStorage } from "./layerGroupsListInterface";

class LayerGroupsList implements LayerGroupsListInterface {
    layerGroupsList: HTMLElement|null;
    listedLayerGroups: LayerGroupsStorage = {};
    constructor(private container: HTMLElement) {
        this.layerGroupsList = this.container.querySelector('[data-js-layer-group-list]');
    }

    public addItem(layerGroupData: LayerGroupDataInterface): void {
        const listItem = createListItem(this.getLayerGroupTitle(layerGroupData));
        this.layerGroupsList?.appendChild(listItem);
        this.listedLayerGroups[layerGroupData.getId()] = {layerGroup: layerGroupData, listItem: listItem};
        this.setClickListener(listItem, layerGroupData);
    }

    public removeItem(layerGroupData: LayerGroupDataInterface): void {
        this.listedLayerGroups[layerGroupData.getId()]?.listItem.remove();
        delete this.listedLayerGroups[layerGroupData.getId()];
    }

    public updateItem(layerGroupData: LayerGroupDataInterface): void {
        if (!this.listedLayerGroups[layerGroupData.getId()].listItem) {
            return;
        }

        this.listedLayerGroups[layerGroupData.getId()].listItem.querySelector('span')!.textContent = this.getLayerGroupTitle(layerGroupData);
    }

    private setClickListener(listItem: HTMLLIElement, layerGroupData: LayerGroupDataInterface): void {
        listItem.addEventListener('click', () => {
            layerGroupData.editLayerGroup();
        });
    }

    // TODO: Add translation
    private getLayerGroupTitle(layerGroupData: LayerGroupDataInterface): string {
        return layerGroupData.getTitle() ? layerGroupData.getTitle() : 'Untitled Layer';
    }
}

export default LayerGroupsList;