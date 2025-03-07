import { LoadOptionDataInterface } from "./options/optionFeature";
import MapStyle from "./options/settings/mapStyle";
import { Setting } from "./options/settings/setting";
import { SaveData, SavedImageOverlayData, SavedLayerGroup, SavedMarkerData, SavedStartPosition } from "./types";

class LoadHiddenField {
    data: SaveData;

    constructor(
        private hiddenField: HTMLInputElement,
        private loadLayerGroupsInstance: LoadOptionDataInterface,
        private loadMarkersInstance: LoadOptionDataInterface,
        private loadImageOverlaysInstance: LoadOptionDataInterface,
        private loadStartPositionInstance: LoadOptionDataInterface,
        private zoomInstance: Setting,
        private mapStyleInstance: Setting,
        private layerFilterInstance: Setting
    ) {
        let json = this.hiddenField.value;
        this.data = JSON.parse(json ?? '');
        if (!json) {
            return;
        }
        
        this.loadLayerGroupsInstance.load(this.data.layerGroups as SavedLayerGroup);
        this.loadMarkersInstance.load(this.data.markers as SavedMarkerData);
        this.loadImageOverlaysInstance.load(this.data.imageOverlays as SavedImageOverlayData);
        this.loadStartPositionInstance.load(this.data.startPosition as SavedStartPosition);
        this.zoomInstance.load(this.data.zoom);
        this.mapStyleInstance.load(this.data.mapStyle);
        this.layerFilterInstance.load(this.data.layerFilter);
    }
}

export default LoadHiddenField;