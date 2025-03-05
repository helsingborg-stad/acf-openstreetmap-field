import { SaveOptionDataInterface } from "./options/saveOptionData";
import { SaveData, SavedImageOverlayData, SavedLayerGroup, SavedMarkerData, SavedStartPosition } from "./types";

declare const acf: any;

class SaveHiddenField {
    data: SaveData = {
        markers: [],
        layerGroups: [],
        imageOverlays: [],
        startPosition: null
    };

    constructor(
        private hiddenField: HTMLInputElement,
        private saveLayerGroups: SaveOptionDataInterface,
        private saveMarkers: SaveOptionDataInterface,
        private saveImageOverlays: SaveOptionDataInterface,
        private saveStartPosition: SaveOptionDataInterface
    ) {
        document.querySelector('[data-js-value="set_start_position"]')?.addEventListener('click', () => {
            const layerGroups = this.saveLayerGroups.save() as SavedLayerGroup;
            const markers = this.saveMarkers.save() as SavedMarkerData;
            const imageOverlays = this.saveImageOverlays.save() as SavedImageOverlayData;
            const startPosition = this.saveStartPosition.save() as SavedStartPosition;
            const data: SaveData = {
                markers: markers,
                layerGroups: layerGroups,
                imageOverlays: imageOverlays,
                startPosition: startPosition
            };

            markers?.forEach((marker) => {
                console.log("HELLO")
            });
            const json = JSON.stringify(this.data);
            this.hiddenField.value = json;

            // console.log(json);
        });

        acf.add_filter('validation_complete', (values: any, form: any) => {
            this.data.layerGroups = this.saveLayerGroups.save() as SavedLayerGroup;
            this.data.markers = this.saveMarkers.save() as SavedMarkerData;
            this.data.imageOverlays = this.saveImageOverlays.save() as SavedImageOverlayData;
            this.data.startPosition = this.saveStartPosition.save() as SavedStartPosition;
            const json = JSON.stringify(this.data);
            this.hiddenField.value = json;

            return values;
        });
    }
}

export default SaveHiddenField;