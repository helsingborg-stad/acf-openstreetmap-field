import { SaveOptionDataInterface } from "./options/saveOptionData";
import { SaveData } from "./types";

declare const acf: any;

class Save {
    data: SaveData = {
        markers: [],
        startPosition: null
    };

    constructor(
        private hiddenField: HTMLInputElement,
        private saveMarkers: SaveOptionDataInterface,
        private saveStartPosition: SaveOptionDataInterface
    ) {
        acf.add_filter('validation_complete', (values: any, form: any) => {
            this.data.markers = this.saveMarkers.save();
            this.data.startPosition = this.saveStartPosition.save();
            const json = JSON.stringify(this.data);
            this.hiddenField.value = json;

            return values;
        });
    }
}

export default Save;