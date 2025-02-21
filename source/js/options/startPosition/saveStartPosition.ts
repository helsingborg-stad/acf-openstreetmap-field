import { SaveStartPosition } from "../../types";
import { OptionSetStartPositionInterface } from "./optionSetStartPositionInterface";

class SaveStartPostion {
    private key: string = 'startPosition';
    constructor(private optionSetStartPositionInstance: OptionSetStartPositionInterface) {}

    public save(): SaveStartPosition {
        return this.optionSetStartPositionInstance.getStartPosition()?.getPosition() ?? null;
    }
}

export default SaveStartPostion;