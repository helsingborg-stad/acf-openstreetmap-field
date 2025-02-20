import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";
import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import { MarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { MarkerDataInterface } from "./markerDataInterface";
import MarkerData from "./markerData";
import { MarkerFactoryInterface } from "./markerFactoryInterface";

class OptionCreateMarker implements OptionFeature, OptionCreateMarkerInterface {
    protected condition: string = 'create_marker';
    private markerCssClass: string = 'marker-create';
    private static idCounter = 0;
    private markers: Record<string, MarkerDataInterface> = {};

    constructor(
        private mapInstance: MapInterface,
        private handleSelectedInstance: HandleSelectedInterface,
        private createMarkerInstance: CreateMarkerInterface,
        private markerFactoryInstance: MarkerFactoryInterface
    ) {
        this.addListener();
    }

    public addMarker(marker: MarkerInterface) {
        const id = `marker-${OptionCreateMarker.idCounter++}`;
        this.markers[id] = this.markerFactoryInstance.create(marker, id);
    }

    public removeMarker(id: string): void {
        if (!this.markers[id]) {
            return;
        }

        this.markers[id].getMarker().removeMarker();
        delete this.markers[id];
    }

    public getMarkers(): Record<string, MarkerDataInterface> {
        return this.markers;
    }

    private addListener(): void {
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

            this.addMarker(marker);
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