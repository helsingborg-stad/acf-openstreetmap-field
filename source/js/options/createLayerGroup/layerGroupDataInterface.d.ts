import { LayerGroupInterface } from "../../../OpenStreetMap/js/features/createLayerGroup/layerGroupInterface";

type LayerGroupsDataStorage = { [id: string]: LayerGroupDataInterface };

interface LayerGroupDataInterface {
    createLayerGroup(): LayerGroupInterface;
    deleteLayerGroup(): void;
    editLayerGroup(): void;
    updateLayerGroup(): void;
    setTitle(title: string): void;
    getTitle(): string;
    setColor(color: string): void;
    getColor(): string;
    setLayerGroup(layerGroup: string): void;
    getLayerGroup(): string;
    setIcon(icon: string): void;
    getIcon(): string;
    getId(): string;
}