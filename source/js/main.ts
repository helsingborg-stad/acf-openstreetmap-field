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
import LayerGroupsList from './options/createLayerGroup/layerGroupsList';
import LoadLayerGroups from './options/createLayerGroup/loadLayerGroups';
import SaveLayerGroups from './options/createLayerGroup/saveLayerGroups';
import Color from './edit/fields/color';
import Layer from './edit/fields/layer';
import Icon from './edit/fields/icon';

declare const acf: any;

class Main {
    mapInstance!: MapInterface;

    constructor(
        id: string,
        container: HTMLElement,
        map: HTMLElement
    ) {
        const hiddenField = container.querySelector('[data-js-hidden-field]') as HTMLInputElement;
    
        if (!acf) {
            console.error('ACF not found');
            return;
        }

        if (!hiddenField) {
            console.error('Hidden field not found');
            return;
        }

        const mapInstance = createMap({
            id: id
        });

        // General
        const createMarkerInstance     = new CreateMarker();
        const createLayerGroupInstance = new CreateLayerGroup();
        const handleSelectedInstance   = new HandleSelected(container);

        // Fields and Edit
        const fieldValidatorInstance = new FieldValidator();
        const overlayInstance        = new Overlay(container);
        const titleInstance          = new Title(overlayInstance);
        const urlInstance            = new Url(overlayInstance);
        const descriptionInstance    = new Description(overlayInstance);
        const colorInstance          = new Color(overlayInstance);
        const editInstance           = new Edit(container);
        const layerInstance          = new Layer(overlayInstance);
        const iconInstance           = new Icon(overlayInstance);

        // Create layer group
        const editLayerGroupDataFactory = new EditLayerGroupDataFactory(
            editInstance,
            overlayInstance,
            titleInstance,
            colorInstance,
            iconInstance,
            layerInstance
        );

        const layerGroupFactoryInstance = new LayerGroupFactory(
            mapInstance,
            createLayerGroupInstance,
            editLayerGroupDataFactory,
            new LayerGroupsList(container)
        );

        // Create marker
        const editMarkerDataFactoryInstance = new EditMarkerDataFactory(
            fieldValidatorInstance,
            editInstance,
            overlayInstance,
            titleInstance,
            urlInstance,
            descriptionInstance,
            layerInstance
        );

        const markerFactoryInstance  = new MarkerFactory(
            mapInstance,
            createMarkerInstance,
            editMarkerDataFactoryInstance,
            new MarkersList(container, mapInstance)
        );

        // Main
        const OptionCreateLayerGroupInstance = new OptionCreateLayerGroup(
            container,
            handleSelectedInstance,
            layerGroupFactoryInstance
        );

        const OptionCreateMarkerInstance = new OptionCreateMarker(
            mapInstance, 
            handleSelectedInstance,
            markerFactoryInstance
        );

        const OptionSetStartPositionInstance = new OptionSetStartPosition(
            mapInstance,
            handleSelectedInstance,
            createMarkerInstance
        );

        // Save and Load
        new LoadHiddenField(
            hiddenField,
            new LoadLayerGroups(layerGroupFactoryInstance),
            new LoadMarkers(markerFactoryInstance),
            new LoadStartPosition(OptionSetStartPositionInstance)
        );

        new SaveHiddenField(
            hiddenField,
            new SaveLayerGroups(),
            new SaveMarkers(),
            new SaveStartPostion(OptionSetStartPositionInstance)
        );
    }
}

export default Main;