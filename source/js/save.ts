import { MapStyle } from "@helsingborg-stad/openstreetmap";
import { SaveOptionDataInterface } from "./options/optionFeature";
import { Setting } from "./options/settings/setting";
import { BlockSettings, SaveData, SavedImageOverlayData, SavedLayerGroup, SavedMarkerData, SavedStartPosition } from "./types";

declare const acf: any;
declare const wp: any;

export const createDefaultSaveData = (): SaveData => ({
    markers: [],
    layerGroups: [],
    imageOverlays: [],
    startPosition: {
        latlng: {
            lat: 56.046467,
            lng: 12.694512
        },
        zoom: 16
    },
    mapStyle: "default",
    layerFilter: "false",
    layerFilterTitle: "",
    layerFilterDefaultOpen: "false"
});

export class StaticBlockDataStore {
    private static readonly store: Record<string, SaveData> = {};
    private static activeBlockId: string | null = null;
    private static suppressSyncEvents = false;

    public static setActiveBlockId(blockId: string | null): void {
        this.activeBlockId = blockId;
    }

    public static getActiveBlockId(): string | null {
        return this.activeBlockId;
    }

    public static beginHydration(): void {
        this.suppressSyncEvents = true;
    }

    public static endHydration(): void {
        this.suppressSyncEvents = false;
    }

    public static set(blockId: string, value: SaveData): void {
        this.store[blockId] = value;
    }

    public static get(blockId: string): SaveData | null {
        const data = this.store[blockId];
        return data ?? null;
    }

    public static getOrCreate(blockId: string | null | undefined, hiddenField: HTMLInputElement, fallbackValue?: string | null): SaveData | null {
        if (blockId && this.store[blockId]) {
            return this.store[blockId];
        }

        const hiddenValue = (hiddenField.value ?? '').trim();
        if (hiddenValue && hiddenValue !== '{}') {
            const parsed = this.parseJson(hiddenValue);

            if (parsed && blockId) {
                this.store[blockId] = parsed;
            }
            return parsed;
        }

        const fallbackJson = (fallbackValue ?? '').trim();
        if (fallbackJson && fallbackJson !== '{}') {
            const parsed = this.parseJson(fallbackJson);
            if (parsed && blockId) {
                this.store[blockId] = parsed;
            }
            return parsed;
        }

        return null;
    }

    public static syncActiveBlock(blockId?: string | null): void {
        if (typeof window === 'undefined') {
            return;
        }

        if (this.suppressSyncEvents) {
            return;
        }

        const targetBlockId = blockId ?? this.activeBlockId;
        if (!targetBlockId) {
            return;
        }

        window.dispatchEvent(new CustomEvent('acf-openstreetmap:state-change', {
            detail: { blockId: targetBlockId }
        }));
    }

    private static parseJson(json: string): SaveData | null {
        try {
            return JSON.parse(json) as SaveData;
        } catch (error) {
            console.warn('[OpenStreetMap] Could not parse stored block data', { json, error });
            return null;
        }
    }
}

class SaveHiddenField {
    data: SaveData = createDefaultSaveData();

    constructor(
        private hiddenField: HTMLInputElement,
        private saveLayerGroups: SaveOptionDataInterface,
        private saveMarkers: SaveOptionDataInterface,
        private saveImageOverlays: SaveOptionDataInterface,
        private saveStartPosition: SaveOptionDataInterface,
        private mapStyleInstance: Setting,
        private layerFilterInstance: Setting,
        private layerFilterTitleInstance: Setting,
        private layerFilterDefaultOpenInstance: Setting,
        private blockSettings: BlockSettings|null
    ) {
        if (typeof window !== 'undefined') {
            window.addEventListener('acf-openstreetmap:state-change', (event: Event) => {
                const customEvent = event as CustomEvent<{ blockId?: string }>; 
                const targetBlockId = customEvent.detail?.blockId;

                if (this.blockSettings && targetBlockId && this.blockSettings.blockId !== targetBlockId) {
                    return;
                }

                if (!this.blockSettings && targetBlockId) {
                    return;
                }

                this.setAndGetData();
            });
        }

        if (blockSettings) {
            document.querySelector('.editor-post-publish-button')?.addEventListener('click', () => {
                this.saveDataToBlock();
            });
        } else {
             acf.add_filter('validation_complete', (values: any, form: any) => {
                this.setAndGetData();
                return values;
            });
        }
    }

    private setAndGetData(): string {
        this.data.layerGroups = this.saveLayerGroups.save() as SavedLayerGroup;
        this.data.markers = this.saveMarkers.save() as SavedMarkerData;
        this.data.imageOverlays = this.saveImageOverlays.save() as SavedImageOverlayData;
        this.data.startPosition = this.saveStartPosition.save() as SavedStartPosition;
        this.data.mapStyle = this.mapStyleInstance.save() as MapStyle;
        this.data.layerFilter = this.layerFilterInstance.save() as "true"|"false";
        this.data.layerFilterTitle = this.layerFilterTitleInstance.save() as string;
        this.data.layerFilterDefaultOpen = this.layerFilterDefaultOpenInstance.save() as "true"|"false";

        if (this.blockSettings?.blockId) {
            StaticBlockDataStore.set(this.blockSettings.blockId, this.data);
        }

        const json = JSON.stringify(this.data);
        this.hiddenField.value = json;

        return json;
    }

    private saveDataToBlock() {
        const currentAttributes = wp.data.select('core/block-editor').getBlockAttributes(this.blockSettings!.blockId);

        if (!currentAttributes || !currentAttributes.data) {
            console.log('No block attributes found or no data attribute present.');
            return;
        }

        const blockValue = currentAttributes.data[this.blockSettings!.fieldName];
        const storedData = StaticBlockDataStore.getOrCreate(this.blockSettings!.blockId, this.hiddenField, blockValue);
        const jsonValue = storedData ? JSON.stringify(storedData) : '{}';

        const updatedAttributes = {
            ...currentAttributes,
            data: {
                ...currentAttributes.data,
                [this.blockSettings!.fieldName]: jsonValue
            }
        };

        wp.data.dispatch('core/block-editor').updateBlockAttributes(this.blockSettings!.blockId, updatedAttributes);
    }
}

export default SaveHiddenField;