import { SavedStartPosition } from "../../types";
import { SaveOptionDataInterface } from "../saveOptionData";
import { OptionSetStartPositionInterface } from "./optionSetStartPositionInterface";

class SaveStartPostion implements SaveOptionDataInterface {
    constructor(private optionSetStartPositionInstance: OptionSetStartPositionInterface) {}

    public save(): SavedStartPosition {
        return this.optionSetStartPositionInstance.getStartPosition()?.getPosition() ?? null;
    }
}

export default SaveStartPostion;