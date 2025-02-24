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
import LoadMarkers from './options/createMarker/loadMarkers';
import LoadStartPosition from './options/startPosition/loadStartPosition';
import FieldValidator from './options/createMarker/fieldValidator';
import Load from './load';

declare const acf: any;

class Main {
    mapInstance!: MapInterface;

    constructor(
        private id: string,
        private container: HTMLElement,
        private map: HTMLElement
    ) {
        const hiddenField = this.container.querySelector('[data-js-hidden-field]') as HTMLInputElement;
    
        if (!acf) {
            console.error('ACF not found');
            return;
        }

        if (!hiddenField) {
            console.error('Hidden field not found');
            return;
        }

        this.mapInstance = createMap({
            id: this.id
        });

        // Others
        const createMarkerInstance  = new CreateMarker(this.mapInstance);
        const handleSelectedInstance = new HandleSelected(this.container);
        const fieldValidatorInstance = new FieldValidator();
        const editMarkerDataInstance = new EditMarkerData(this.container, fieldValidatorInstance);
        const markerFactoryInstance = new MarkerFactory(editMarkerDataInstance);

        // Main
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

        // Save and Load
        new Load(hiddenField, new LoadMarkers(OptionCreateMarkerInstance), new LoadStartPosition(OptionSetStartPositionInstance));
        new Save(hiddenField,  new SaveMarkers(OptionCreateMarkerInstance), new SaveStartPostion(OptionSetStartPositionInstance));
    }
}

export default Main;