import { createMap } from '../OpenStreetMap/js/map';
import { MapInterface } from '../OpenStreetMap/js/mapInterface';
import { CreateMarker } from '../OpenStreetMap/js/features/createMarker/createMarker';
import HandleSelected from './options/handleSelected';
import OptionCreateMarker from './options/createMarker/optionCreateMarker';
import OptionSetStartPosition from './options/startPosition/optionSetStartPosition';
import EditMarkerData from './options/createMarker/edit/editMarkerData';
import MarkerFactory from './options/createMarker/markerFactory';
import SaveHiddenField from './save';
import SaveMarkers from './options/createMarker/saveMarkers';
import SaveStartPostion from './options/startPosition/saveStartPosition';
import LoadMarkers from './options/createMarker/loadMarkers';
import LoadStartPosition from './options/startPosition/loadStartPosition';
import FieldValidator from './options/createMarker/edit/fieldValidator';
import LoadHiddenField from './load';
import Title from './options/createMarker/edit/fields/title';
import Url from './options/createMarker/edit/fields/url';
import Save from './options/createMarker/edit/actions/save';
import Overlay from './options/createMarker/edit/overlay';
import Description from './options/createMarker/edit/fields/description';
import Cancel from './options/createMarker/edit/actions/cancel';
import Delete from './options/createMarker/edit/actions/delete';
import MarkersList from './options/createMarker/markersList';
import MarkerStorage from './options/createMarker/markerStorage';
import { MarkerStorageInterface } from './options/createMarker/markerStorageInterface';

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

        this.mapInstance = this.createMap();

        // Others
        const createMarkerInstance   = new CreateMarker(this.mapInstance);
        const handleSelectedInstance = new HandleSelected(this.container);
        const [markerStorageInstance, markerFactoryInstance]  = this.setupCreateMarkersFeature(createMarkerInstance, handleSelectedInstance);

        // Main
        const OptionSetStartPositionInstance = new OptionSetStartPosition(
            this.mapInstance,
            handleSelectedInstance,
            createMarkerInstance
        );

        // Save and Load
        new LoadHiddenField(
            hiddenField,
            new LoadMarkers(markerStorageInstance, markerFactoryInstance),
            new LoadStartPosition(OptionSetStartPositionInstance)
        );

        new SaveHiddenField(
            hiddenField,
            new SaveMarkers(markerStorageInstance),
            new SaveStartPostion(OptionSetStartPositionInstance)
        );
    }

    private setupCreateMarkersFeature(createMarkerInstance: CreateMarker, handleSelectedInstance: HandleSelectedInterface): [MarkerStorageInterface, MarkerFactory] {
        const fieldValidatorInstance = new FieldValidator();
        const overlayInstance        = new Overlay(this.container);
        const markersListInstance    = new MarkersList(this.container);
        const markerStorageInstance  = new MarkerStorage(markersListInstance);

        const titleInstance          = new Title(overlayInstance);
        const urlInstance            = new Url(overlayInstance);
        const descriptionInstance    = new Description(overlayInstance);

        const editMarkerDataInstance = new EditMarkerData(
            overlayInstance,
            titleInstance,
            urlInstance,
            descriptionInstance
        );

        const markerFactoryInstance  = new MarkerFactory(createMarkerInstance, editMarkerDataInstance, markerStorageInstance);

        new Save(
            markersListInstance,
            markerStorageInstance,
            fieldValidatorInstance,
            overlayInstance,
            titleInstance,
            urlInstance,
            descriptionInstance
        );

        new Cancel(
            markerStorageInstance,
            overlayInstance
        );

        new Delete(
            markerStorageInstance,
            overlayInstance
        )

        const OptionCreateMarkerInstance = new OptionCreateMarker(
            this.mapInstance, 
            handleSelectedInstance,
            markerFactoryInstance
        );

        return [markerStorageInstance, markerFactoryInstance];
    }

    private createMap(): MapInterface {
        return createMap({
            id: this.id
        });
    }
}

export default Main;