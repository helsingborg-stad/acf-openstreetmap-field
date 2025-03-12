import { LayerGroupDataInterface } from "./layerGroupDataInterface";
import ListItemHelper from "../../helper/createListItem";
import { LayerGroupsListInterface, LayerGroupsStorage } from "./layerGroupsListInterface";
import LayerGroupData from "./layerGroupData";

class LayerGroupsList implements LayerGroupsListInterface {
    layerGroupsList: HTMLElement|null;
    styleElement: HTMLStyleElement|null;
    listedLayerGroups: LayerGroupsStorage = {};
    layerAttribute: string = 'data-js-layer-group';

    constructor(private container: HTMLElement, private listItemHelper: ListItemHelper) {
        this.styleElement = this.container.querySelector('[data-js-style]');
        this.layerGroupsList = this.container.querySelector('[data-js-layer-group-list]');
    }

    public addItem(layerGroupData: LayerGroupDataInterface): void {
        const listItem = this.listItemHelper.createListItem(this.getLayerGroupTitle(layerGroupData));
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
        listItem.querySelector('[data-js-edit-icon]')?.addEventListener('click', () => {
            listItem.classList.remove('is-active');
            layerGroupData.editLayerGroup();
        });

        listItem.addEventListener('click', () => {
            const alreadyActive = listItem.classList.contains('is-active');
            this.removeIsActiveClass();

            if (alreadyActive) {
                if (this.styleElement) {
                    this.styleElement.innerHTML = '';
                }

                LayerGroupData.setActiveLayerGroup(null);
            } else {
                if (this.styleElement) {
                    this.styleElement.innerHTML = `[${this.layerAttribute}]:not([${this.layerAttribute}="${layerGroupData.getId()}"]) { display: none; }`;
                }

                listItem.classList.add('is-active');
                LayerGroupData.setActiveLayerGroup(layerGroupData);
            }
        });
    }

    private removeIsActiveClass(): void {
        for (const key in this.listedLayerGroups) {
            this.listedLayerGroups[key].listItem.classList.remove('is-active');
        }
    }

    private getLayerGroupTitle(layerGroupData: LayerGroupDataInterface): string {
        return layerGroupData.getTitle() ? layerGroupData.getTitle() : 'Untitled Layer';
    }
}

export default LayerGroupsList;