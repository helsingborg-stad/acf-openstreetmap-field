import { MarkerDataInterface } from "./options/createMarker/markerDataInterface";
import { OptionSetStartPositionInterface } from "./options/startPosition/optionSetStartPositionInterface";

declare const acf: any;

class Save {
    hiddenField: HTMLInputElement|null;
    data: {
        markers: Array<any>;
        startPosition: MarkerDataInterface|null;
    };

    constructor(
        private container: HTMLElement,
        private createMarker: OptionCreateMarkerInterface,
        private setStartPosition: OptionSetStartPositionInterface
    ) {
        this.data = {
            markers: [],
            startPosition: null
        };

        this.hiddenField = this.container.querySelector('[data-js-hidden-field]');

        if (!this.hiddenField) {
            return;
        }

        this.setSaveListener();
    }

    private setSaveListener(): void {
        acf.add_filter('validation_complete', (json: any, form: any) => {

            return json;
        });
    }
}

export default Save;