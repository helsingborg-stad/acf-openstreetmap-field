import { OptionCreateMarkerInterface } from "./options/createMarker/optionCreateMarkerInterface";
import { OptionSetStartPositionInterface } from "./options/startPosition/optionSetStartPositionInterface";

class Load {
    constructor(
        private hiddenField: HTMLInputElement,
        private optionCreateMarkerInstance: OptionCreateMarkerInterface,
        private optionSetStartPositionInstance: OptionSetStartPositionInterface
    ) {
        let json = this.hiddenField.value;
        const data = JSON.parse(json ?? '');
        if (!json) {
            return;
        }

        console.log(data);
    }
}

export default Load;