import { createMap } from '../OpenStreetMap/js/map';
import { MapInterface } from '../OpenStreetMap/js/mapInterface';
import { CreateMarker } from '../OpenStreetMap/js/features/createMarker/createMarker';

import HandleSelected from './options/handleSelected';
import OptionCreateMarker from './options/createMarker/optionCreateMarker';
import OptionSetStartPosition from './options/startPosition/optionSetStartPosition';
import EditMarkerData from './options/createMarker/editMarkerData';
import MarkerFactory from './options/createMarker/markerFactory';
import Save from './save';
import SaveMarkers from './options/createMarker/saveMarkers';
import SaveStartPostion from './options/startPosition/saveStartPosition';

declare const acf: any;

class Main {
    mapInstance!: MapInterface;

    constructor(
        private id: string,
        private container: HTMLElement,
        private map: HTMLElement
    ) {
        
        if (!acf) {
            console.error('ACF not found');
            return;
        }

        this.mapInstance = createMap({
            id: this.id
        });


        const createMarkerInstance  = new CreateMarker(this.mapInstance);

        const handleSelectedInstance = new HandleSelected(this.container);

        const editMarkerDataInstance = new EditMarkerData(this.container);
        const markerFactoryInstance = new MarkerFactory(editMarkerDataInstance);

        const OptionCreateMarkerInstance = new OptionCreateMarker(
            this.mapInstance, 
            handleSelectedInstance,
            createMarkerInstance,
            markerFactoryInstance
        );
        const OptionSetStartPositionInstance = new OptionSetStartPosition(
            this.mapInstance,
            handleSelectedInstance,
            createMarkerInstance
        );

        new Save(this.container,  new SaveMarkers(OptionCreateMarkerInstance), new SaveStartPostion(OptionSetStartPositionInstance));
    }
}

export default Main;