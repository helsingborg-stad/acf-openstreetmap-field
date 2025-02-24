import { SaveData } from "./types";

class LoadHiddenField {
    data: SaveData|undefined;

    constructor(
        private hiddenField: HTMLInputElement,
        private loadMarkersInstance: LoadOptionDataInterface,
        private loadStartPositionInstance: LoadOptionDataInterface
    ) {
        let json = this.hiddenField.value;
        this.data = JSON.parse(json ?? '');
        if (!json) {
            return;
        }
        
        this.loadMarkersInstance.load(this.data?.markers);
        this.loadStartPositionInstance.load(this.data?.startPosition);

    }
}

export default LoadHiddenField;