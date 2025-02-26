import { SavedLayerGroup } from "../../types";
import { LayerGroupFactoryInterface } from "./layerGroupFactoryInterface";

class LoadLayerGroups implements LoadOptionDataInterface {
    constructor(
        private layerGroupFactory: LayerGroupFactoryInterface
    ) {}

    public load(savedLayerGroups: SavedLayerGroup): void {
        for (let savedLayerGroup of savedLayerGroups) {
            const layerGroupData = this.layerGroupFactory.create();
            layerGroupData.setTitle(savedLayerGroup.title ?? '');
            layerGroupData.createLayerGroup();
        }
    }
}

export default LoadLayerGroups;