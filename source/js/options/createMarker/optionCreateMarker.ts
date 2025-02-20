import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";

class OptionCreateMarker implements OptionFeature {
    protected condition: string = 'create_marker';
    private markerCssClass: string = 'marker-create';

    constructor(
        private mapInstance: MapInterface,
        private handleSelectedInstance: HandleSelectedInterface,
        private createMarkerInstance: CreateMarkerInterface,
        private markersInstance: MarkersInterface
    ) {
        this.mapInstance.addListener('click', (e: any) => {
            if (this.handleSelectedInstance.getCurrentSelectedValue() !== this.condition ||
                e.originalEvent.target.classList.contains(this.markerCssClass)) {
                return;
            }
            
            const marker = this.createMarkerInstance.create({
                position: e.latlng,
                icon: this.getMarkerMarkup(),
                draggable: true,
            });

            this.markersInstance.addMarker(marker);
        });
    }

    private getMarkerMarkup(): string {
        return `<div class="${this.markerCssClass}" style="color: green;">C</div>`;
    }

    public checkCondition(value: string): boolean {
        return value === this.condition;
    }
}

export default OptionCreateMarker;