import { createMap } from '../OpenStreetMap/js/map';
import { MapInterface } from '../OpenStreetMap/js/mapInterface';
import { CreateMarker } from '../OpenStreetMap/js/features/createMarker/createMarker';
import { CreateLayerGroup } from '../OpenStreetMap/js/features/createLayerGroup/createLayerGroup';
import HandleSelected from './options/handleSelected';
import OptionCreateMarker from './options/createMarker/optionCreateMarker';
import OptionSetStartPosition from './options/startPosition/optionSetStartPosition';
import MarkerFactory from './options/createMarker/markerFactory';
import SaveHiddenField from './save';
import SaveMarkers from './options/createMarker/saveMarkers';
import SaveStartPostion from './options/startPosition/saveStartPosition';
import LoadMarkers from './options/createMarker/loadMarkers';
import LoadStartPosition from './options/startPosition/loadStartPosition';
import FieldValidator from './edit/fields/fieldValidator';
import LoadHiddenField from './load';
import Title from './edit/fields/title';
import Url from './edit/fields/url';
import Overlay from './edit/overlay';
import Description from './edit/fields/description';
import MarkersList from './options/createMarker/markersList';
import OptionCreateLayerGroup from './options/createLayerGroup/optionCreateLayerGroup';
import EditMarkerDataFactory from './options/createMarker/edit/editMarkerDataFactory';
import Edit from './edit/actions/edit';
import LayerGroupFactory from './options/createLayerGroup/layerGroupFactory';
import EditLayerGroupDataFactory from './options/createLayerGroup/edit/editLayerGroupDataFactory';
import { Addable } from '../OpenStreetMap/js/addableInterface';

declare const acf: any;

class Main {
    mapInstance!: MapInterface&Addable;

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
        const createLayerGroupInstance = new CreateLayerGroup(this.mapInstance);
        const handleSelectedInstance = new HandleSelected(this.container);

        // Main
        const layerGroupFactoryInstance = this.setupCreateLayerGroupsFeature(createLayerGroupInstance, handleSelectedInstance);

        const markerFactoryInstance  = this.setupCreateMarkersFeature(createMarkerInstance, handleSelectedInstance);

        const OptionSetStartPositionInstance = new OptionSetStartPosition(
            this.mapInstance,
            handleSelectedInstance,
            createMarkerInstance
        );

        // Save and Load
        new LoadHiddenField(
            hiddenField,
            new LoadMarkers(markerFactoryInstance),
            new LoadStartPosition(OptionSetStartPositionInstance)
        );

        new SaveHiddenField(
            hiddenField,
            new SaveMarkers(),
            new SaveStartPostion(OptionSetStartPositionInstance)
        );
    }

    private setupCreateLayerGroupsFeature(createLayerGroupInstance: CreateLayerGroup, handleSelectedInstance: HandleSelected): LayerGroupFactory {
        const editLayerGroupDataFactory = new EditLayerGroupDataFactory();
        const layerGroupFactoryInstance = new LayerGroupFactory(
            this.mapInstance,
            createLayerGroupInstance,
            editLayerGroupDataFactory
        );

        const OptionCreateLayerGroupInstance = new OptionCreateLayerGroup(
            this.container,
            handleSelectedInstance,
            layerGroupFactoryInstance
        );

        return layerGroupFactoryInstance;
    }

    private setupCreateMarkersFeature(createMarkerInstance: CreateMarker, handleSelectedInstance: HandleSelectedInterface): MarkerFactory {
        const fieldValidatorInstance = new FieldValidator();
        const overlayInstance        = new Overlay(this.container);
        const markersListInstance    = new MarkersList(this.container, this.mapInstance);

        const titleInstance          = new Title(overlayInstance);
        const urlInstance            = new Url(overlayInstance);
        const descriptionInstance    = new Description(overlayInstance);

        const editInstance = new Edit(this.container);

        const editMarkerDataFactoryInstance = new EditMarkerDataFactory(
            fieldValidatorInstance,
            editInstance,
            overlayInstance,
            titleInstance,
            urlInstance,
            descriptionInstance
        );

        const markerFactoryInstance  = new MarkerFactory(
            this.mapInstance,
            createMarkerInstance,
            editMarkerDataFactoryInstance,
            markersListInstance
        );

        const OptionCreateMarkerInstance = new OptionCreateMarker(
            this.mapInstance, 
            handleSelectedInstance,
            markerFactoryInstance
        );

        return markerFactoryInstance;
    }

    private createMap(): MapInterface&Addable {
        return createMap({
            id: this.id
        });
    }
}

export default Main;