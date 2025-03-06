import { LoadOptionDataInterface } from "./options/optionFeature";
import { SaveData, SavedImageOverlayData, SavedLayerGroup, SavedMarkerData, SavedStartPosition } from "./types";

class LoadHiddenField {
    data: SaveData;

    constructor(
        private hiddenField: HTMLInputElement,
        private loadLayerGroupsInstance: LoadOptionDataInterface,
        private loadMarkersInstance: LoadOptionDataInterface,
        private loadImageOverlaysInstance: LoadOptionDataInterface,
        private loadStartPositionInstance: LoadOptionDataInterface,
        private zoomInstance: Setting
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
    }
}

export default LoadHiddenField;