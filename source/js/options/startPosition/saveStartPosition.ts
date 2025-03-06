import { SavedStartPosition } from "../../types";
import { SaveOptionDataInterface } from "../optionFeature";
import { OptionSetStartPositionInterface } from "./optionSetStartPositionInterface";

class SaveStartPostion implements SaveOptionDataInterface {
    constructor(private optionSetStartPositionInstance: OptionSetStartPositionInterface) {}

    public save(): SavedStartPosition {
        return this.optionSetStartPositionInstance.getStartPositionMarker()?.getPosition() ?? null;
    }
}

export default SaveStartPostion;