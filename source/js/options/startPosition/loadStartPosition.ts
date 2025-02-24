import { SaveStartPosition } from "../../types";
import { OptionSetStartPositionInterface } from "./optionSetStartPositionInterface";

class LoadStartPosition implements LoadOptionDataInterface {
    constructor(private optionSetStartPositionInstance: OptionSetStartPositionInterface) {}

    public load(startPosition: SaveStartPosition): void {
        if (startPosition) {
            this.optionSetStartPositionInstance.addMarker(startPosition);
        }
    }
}

export default LoadStartPosition;