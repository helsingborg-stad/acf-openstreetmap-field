import SaveImageOverlays from "./options/createImageOverlay/saveImageOverlays";
import { SaveOptionDataInterface } from "./options/saveOptionData";
import { SaveData } from "./types";

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
        acf.add_filter('validation_complete', (values: any, form: any) => {
            this.data.layerGroups = this.saveLayerGroups.save();
            this.data.markers = this.saveMarkers.save();
            this.data.imageOverlays = this.saveImageOverlays.save();
            this.data.startPosition = this.saveStartPosition.save();
            const json = JSON.stringify(this.data);
            this.hiddenField.value = json;

            return values;
        });
    }
}

export default SaveHiddenField;