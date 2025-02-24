import { MarkerDataInterface } from "../markerDataInterface";
import { EditMarkerDataInterface } from "./editMarkerDataInterface";

class EditMarkerData implements EditMarkerDataInterface {
    currentMarker: MarkerDataInterface|null = null;

    constructor(
        private overlayInstance: OverlayInterface,
        private titleInstance: TitleInterface,
        private urlInstance: UrlInterface,
        private descriptionInstance: DescriptionInterface
    ) {
    }

    public edit(marker: MarkerDataInterface): void {
        this.setDefaultFieldValues(marker);
        this.overlayInstance.showOverlay();
    }

    private setDefaultFieldValues(marker: MarkerDataInterface): void {
        this.titleInstance.setTitleValue(marker.getTitle());
        this.urlInstance.setUrlValue(marker.getUrl());
        this.descriptionInstance.setDescriptionValue(marker.getDescription());
    }
}

export default EditMarkerData;