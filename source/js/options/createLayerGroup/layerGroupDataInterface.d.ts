import { LayerGroupInterface } from "@helsingborg-stad/openstreetmap";
import { MarkerDataInterface } from "../createMarker/markerDataInterface";

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
    getLayer(): LayerGroupInterface|null;
    // static setActiveLayerGroup(layerGroup: LayerGroupDataInterface|null): void;
    // static getActiveLayerGroup(): LayerGroupDataInterface|null;
    getIcon(): string;
    getId(): string;
}