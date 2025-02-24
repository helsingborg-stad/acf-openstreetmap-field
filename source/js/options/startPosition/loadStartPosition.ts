import { OptionSetStartPositionInterface } from "./optionSetStartPositionInterface";

class LoadStartPosition implements LoadOptionDataInterface {
    constructor(private optionSetStartPositionInstance: OptionSetStartPositionInterface) {}

    public load(): void {

    }
}

export default LoadStartPosition;