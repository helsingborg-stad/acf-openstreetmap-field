import { SavedImageOverlayData, SavedLayerGroup, SavedMarkerData, SavedStartPosition } from "../types";
import SaveLayerGroups from "./createLayerGroup/saveLayerGroups";

interface OptionFeature {
    checkCondition(value: string): boolean;
}

interface SaveOptionDataInterface {
    save(): SavedMarkerData|SavedStartPosition|SavedImageOverlayData|SavedLayerGroup;
}

interface LoadOptionDataInterface {
    load(data: SavedMarkerData|SavedStartPosition|SavedImageOverlayData|SavedLayerGroup): void;
}