import { LayerGroupDataInterface } from "./layerGroupDataInterface";
import ListItemHelper from "../../helper/createListItem";
import { LayerGroupsListInterface, LayerGroupsStorage } from "./layerGroupsListInterface";
import LayerGroupData from "./layerGroupData";

class LayerGroupsList implements LayerGroupsListInterface {
    layerGroupsList: HTMLElement|null;
    styleElement: HTMLStyleElement|null;
    defaultLayerGroup: HTMLElement|null;
    listedLayerGroups: LayerGroupsStorage = {};
    layerAttribute: string = 'data-js-layer-group';
    activeClass: string = 'is-active';

    constructor(private container: HTMLElement, private listItemHelper: ListItemHelper) {
        this.styleElement = this.container.querySelector('[data-js-style]');
        this.layerGroupsList = this.container.querySelector('[data-js-layer-group-list]');
        this.defaultLayerGroup = this.container.querySelector('[default-layer-group]');

        this.handleDefaultLayerGroup();
    }

    private handleDefaultLayerGroup(): void {
        if (!this.defaultLayerGroup) {
            return;
        }

        this.defaultLayerGroup.addEventListener('click', () => {
            this.removeIsActiveClass();
            this.defaultLayerGroup?.classList.add(this.activeClass);
            LayerGroupData.setActiveLayerGroup(null);
        });
    }

    public addItem(layerGroupData: LayerGroupDataInterface): void {
        const listItem = this.listItemHelper.createListItem(this.getLayerGroupTitle(layerGroupData), 'edit');
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
            listItem.classList.remove(this.activeClass);
            layerGroupData.editLayerGroup();
        });

        listItem.addEventListener('click', () => {
            this.removeIsActiveClass();

            if (this.styleElement) {
                this.styleElement.innerHTML = `[${this.layerAttribute}]:not([${this.layerAttribute}="${layerGroupData.getId()}"]) { display: none; }`;
            }

            listItem.classList.add(this.activeClass);
            LayerGroupData.setActiveLayerGroup(layerGroupData);
        });
    }

    private removeIsActiveClass(): void {
        this.defaultLayerGroup?.classList.remove(this.activeClass);

        for (const key in this.listedLayerGroups) {
            this.listedLayerGroups[key].listItem.classList.remove(this.activeClass);
        }
    }

    private getLayerGroupTitle(layerGroupData: LayerGroupDataInterface): string {
        return layerGroupData.getTitle() ? layerGroupData.getTitle() : 'Untitled Layer';
    }
}

export default LayerGroupsList;