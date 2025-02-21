import { SaveData } from "./types";

declare const acf: any;

class Save {
    hiddenField: HTMLInputElement|null;
    data: SaveData = {
        markers: [],
        startPosition: null
    };

    constructor(
        private container: HTMLElement,
        private saveMarkers: SaveOptionDataInterface,
        private saveStartPosition: SaveOptionDataInterface
    ) {
        this.hiddenField = this.container.querySelector('[data-js-hidden-field]');

        if (!this.hiddenField) {
            return;
        }
        console.log(this.hiddenField);
        document.querySelector('#publish')?.addEventListener('click', (e) => {
            this.data.markers = this.saveMarkers.save();
            this.data.startPosition = this.saveStartPosition.save();
            const json = JSON.stringify(this.data);
            (this.hiddenField as HTMLInputElement).value = json;
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