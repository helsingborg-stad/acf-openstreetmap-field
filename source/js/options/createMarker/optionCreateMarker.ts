import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import { MarkerFactoryInterface } from "./markerFactoryInterface";
import { MarkersDataInterface, OptionCreateMarkerInterface } from "./optionCreateMarkerInterface";
import { LatLngObject } from "../../../OpenStreetMap/js/types";
import { MarkerDataInterface } from "./markerDataInterface";

class OptionCreateMarker implements OptionFeature, OptionCreateMarkerInterface {
    protected condition: string = 'create_marker';
    private markerCssClass: string = 'marker-create';
    private static idCounter = 0;
    private markers: MarkersDataInterface = {};

    constructor(
        private mapInstance: MapInterface,
        private handleSelectedInstance: HandleSelectedInterface,
        private createMarkerInstance: CreateMarkerInterface,
        private markerFactoryInstance: MarkerFactoryInterface
    ) {
        this.addListener();
    }

    public addMarker(latlng: LatLngObject): MarkerDataInterface {
        const marker = this.createMarkerInstance.create({
            position: latlng,
            icon: this.getMarkerMarkup(),
            draggable: true,
        });

        const id = `marker-${OptionCreateMarker.idCounter++}`;
        const markerData = this.markerFactoryInstance.create(marker, id);
        this.markers[id] = markerData;

        return markerData;
    }

    public removeMarker(id: string): void {
        if (!this.markers[id]) {
            return;
        }

        this.markers[id].getMarker().removeMarker();
        delete this.markers[id];
    }

    public getMarkers(): MarkersDataInterface {
        return this.markers;
    }

    private addListener(): void {
        this.mapInstance.addListener('click', (e: any) => {
            if (this.handleSelectedInstance.getCurrentSelectedValue() !== this.condition ||
                e.originalEvent.target.classList.contains(this.markerCssClass)) {
                return;
            }

            this.addMarker(e.latlng);
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