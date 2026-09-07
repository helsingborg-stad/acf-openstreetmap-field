import { LoadOptionDataInterface } from "./options/optionFeature";
import MarkerData from "./options/createMarker/markerData";
import LayerGroupData from "./options/createLayerGroup/layerGroupData";
import MapStyle from "./options/settings/mapStyle";
import { Setting } from "./options/settings/setting";
import { StaticBlockDataStore, createDefaultSaveData } from "./save";
import { BlockSettings, SaveData, SavedImageOverlayData, SavedLayerGroup, SavedMarkerData, SavedStartPosition } from "./types";

declare const wp: any;
class LoadHiddenField {
    data: SaveData;

    constructor(
        private hiddenField: HTMLInputElement,
        private loadLayerGroupsInstance: LoadOptionDataInterface,
        private loadMarkersInstance: LoadOptionDataInterface,
        private loadImageOverlaysInstance: LoadOptionDataInterface,
        private loadStartPositionInstance: LoadOptionDataInterface,
        private mapStyleInstance: Setting,
        private layerFilterInstance: Setting,
        private layerFilterTitleInstance: Setting,
        private layerFilterDefaultOpenInstance: Setting,
        private blockSettings: BlockSettings | null
    ) {
        MarkerData.clearMarkers();
        LayerGroupData.clearLayerGroups();

        const storedData = this.resolveStoredData();
        if (!storedData) {
            this.data = createDefaultSaveData();
            return;
        }

        this.data = storedData;

        this.loadLayerGroupsInstance.load(this.data.layerGroups as SavedLayerGroup);
        this.loadMarkersInstance.load(this.data.markers as SavedMarkerData);
        this.loadImageOverlaysInstance.load(this.data.imageOverlays as SavedImageOverlayData);
        this.loadStartPositionInstance.load(this.data.startPosition as SavedStartPosition);
        this.mapStyleInstance.load(this.data.mapStyle);
        this.layerFilterTitleInstance.load(this.data.layerFilterTitle);
        this.layerFilterDefaultOpenInstance.load(this.data.layerFilterDefaultOpen);
        this.layerFilterInstance.load(this.data.layerFilter);
    }

    private resolveStoredData(): SaveData | null {
        if (this.blockSettings) {
            console.log(this.blockSettings);
            const blockAttributes = wp.data.select('core/block-editor').getBlockAttributes(this.blockSettings.blockId);
            const blockFieldValue = typeof blockAttributes?.data?.[this.blockSettings.fieldName] === 'string'
                ? blockAttributes.data[this.blockSettings.fieldName]
                : null;

            const fromStore = StaticBlockDataStore.getOrCreate(this.blockSettings.blockId, this.hiddenField, blockFieldValue);
            if (fromStore) {
                this.hiddenField.value = JSON.stringify(fromStore);
                return fromStore;
            }
        }

        const hiddenValue = (this.hiddenField.value ?? '').trim();
        if (!hiddenValue || hiddenValue === '{}') {
            return null;
        }

        try {
            return JSON.parse(hiddenValue) as SaveData;
        } catch (error) {
            console.warn('[OpenStreetMap] load() could not parse saved JSON, resetting to empty state', {
                hiddenFieldId: this.hiddenField.id,
                hiddenValue,
                error,
            });
            return null;
        }
    }
}

export default LoadHiddenField;