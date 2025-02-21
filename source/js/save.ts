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
        document.querySelector('#publish')?.addEventListener('click', (e) => {
            this.data.markers = this.saveMarkers.save();
            this.data.startPosition = this.saveStartPosition.save();
            const json = JSON.stringify(this.data);
            this.hiddenField.value = json;
            console.log(json);
        });

        // acf.add_filter('validation_complete', (json: any, form: any) => {
        //     this.data.markers = this.saveMarkers.save();
        //     this.data.startPosition = this.saveStartPosition.save();
        //     return json;
        // });
    }
}

export default Save;