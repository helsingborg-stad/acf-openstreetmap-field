import { MarkerDataInterface } from "../markerDataInterface";
import { EditMarkerDataInterface } from "./editMarkerDataInterface";

class EditMarkerData implements EditMarkerDataInterface {
    currentMarker: MarkerDataInterface|null = null;

    constructor(
        private overlayInstance: OverlayInterface,
        private titleInstance: Field,
        private urlInstance: Field,
        private descriptionInstance: Field
    ) {
    }

    public edit(marker: MarkerDataInterface): void {
        this.setDefaultFieldValues(marker);
        this.overlayInstance.showOverlay();
    }

    private setDefaultFieldValues(marker: MarkerDataInterface): void {
        this.titleInstance.setValue(marker.getTitle());
        this.urlInstance.setValue(marker.getUrl());
        this.descriptionInstance.setValue(marker.getDescription());
    }
}

export default EditMarkerData;