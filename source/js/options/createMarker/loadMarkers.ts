import { OptionCreateMarkerInterface } from "./optionCreateMarkerInterface";

class LoadMarkers implements LoadOptionDataInterface {
    constructor(private optionCreateMarkerInstance: OptionCreateMarkerInterface) {}

    public load(): void {

    }
}

export default LoadMarkers;