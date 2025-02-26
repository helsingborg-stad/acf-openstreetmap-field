import { Addable } from "../../../OpenStreetMap/js/addableInterface";
import { AddTo } from "../../../OpenStreetMap/js/addToInterface";

type LayerGroupsDataStorage = { [id: string]: LayerGroupDataInterface };

interface LayerGroupDataInterface {
    createLayerGroup(): LayerGroupInterface&AddTo&Addable;
    deleteLayerGroup(): void;
    editLayerGroup(): void;
    updateLayerGroup(): void;
    setTitle(title: string): void;
    getTitle(): string;
    getId(): number;
}