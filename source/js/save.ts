import { MapStyle } from "@helsingborg-stad/openstreetmap";
import { SaveOptionDataInterface } from "./options/optionFeature";
import { Setting } from "./options/settings/setting";
import { SaveData, SavedImageOverlayData, SavedLayerGroup, SavedMarkerData, SavedStartPosition } from "./types";

declare const acf: any;

class SaveHiddenField {
    data: SaveData = {
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
        layerFilterTitle: ""
    };

    constructor(
        private hiddenField: HTMLInputElement,
        private saveLayerGroups: SaveOptionDataInterface,
        private saveMarkers: SaveOptionDataInterface,
        private saveImageOverlays: SaveOptionDataInterface,
        private saveStartPosition: SaveOptionDataInterface,
        private mapStyleInstance: Setting,
        private layerFilterInstance: Setting,
        private layerFilterTitleInstance: Setting
    ) {
        acf.add_filter('validation_complete', (values: any, form: any) => {
            this.data.layerGroups = this.saveLayerGroups.save() as SavedLayerGroup;
            this.data.markers = this.saveMarkers.save() as SavedMarkerData;
            this.data.imageOverlays = this.saveImageOverlays.save() as SavedImageOverlayData;
            this.data.startPosition = this.saveStartPosition.save() as SavedStartPosition;
            this.data.mapStyle = this.mapStyleInstance.save() as MapStyle;
            this.data.layerFilter = this.layerFilterInstance.save() as "true"|"false";
            this.data.layerFilterTitle = this.layerFilterTitleInstance.save() as string;
            const json = JSON.stringify(this.data);
            this.hiddenField.value = json;

            return values;
        });
    }
}

export default SaveHiddenField;