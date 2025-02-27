import { LayerGroupInterface } from "../../../OpenStreetMap/js/features/createLayerGroup/layerGroupInterface";

type LayerGroupsDataStorage = { [id: string]: LayerGroupDataInterface };

interface LayerGroupDataInterface {
    createLayerGroup(): LayerGroupInterface;
    deleteLayerGroup(): void;
    editLayerGroup(): void;
    updateLayerGroup(): void;
    setTitle(title: string): void;
    getTitle(): string;
    getId(): number;
}