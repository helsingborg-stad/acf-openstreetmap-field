import { SaveStartPosition } from "../../types";
import { SaveOptionDataInterface } from "../saveOptionData";
import { OptionSetStartPositionInterface } from "./optionSetStartPositionInterface";

class SaveStartPostion implements SaveOptionDataInterface {
    private key: string = 'startPosition';
    constructor(private optionSetStartPositionInstance: OptionSetStartPositionInterface) {}

    public save(): SaveStartPosition {
        return this.optionSetStartPositionInstance.getStartPosition()?.getPosition() ?? null;
    }
}

export default SaveStartPostion;