import { CreateMarker, MapInterface, CreateLayerGroup, CreateImageOverlay, createMap } from '@helsingborg-stad/openstreetmap';
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
import OptionCreateImageOverlay from './options/createImageOverlay/optionCreateImageOverlay';
import ImageOverlayFactory from './options/createImageOverlay/imageOverlayFactory';
import EditImageOverlayFactory from './options/createImageOverlay/edit/editImageOverlayDataFactory';
import Image from './edit/fields/image';
import ImageOverlaysList from './options/createImageOverlay/imageOverlaysList';
import ImageOverlayResize from './options/createImageOverlay/imageFunctionality/imageOverlayResize';
import ImageOverlayBoundsAndRatioCalculator from './options/createImageOverlay/helper/imageOverlayBoundsAndRatioCalculator';
import ImageOverlayMove from './options/createImageOverlay/imageFunctionality/imageOverlayMove';
import LoadImageOverlays from './options/createImageOverlay/loadImageOverlays';
import SaveImageOverlays from './options/createImageOverlay/saveImageOverlays';


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
            id: id,
            zoom: 12
        });

        // General
        const createMarkerInstance     = new CreateMarker();
        const createLayerGroupInstance = new CreateLayerGroup();
        const createImageOverlayInstance = new CreateImageOverlay();
        const createRectangleInstance  = new CreateRectangle();
        const handleSelectedInstance   = new HandleSelected(container);

        // Fields and Edit
        const fieldValidatorInstance = new FieldValidator();
        const overlayInstance        = new Overlay(container);
        const editInstance           = new Edit(container);
        const titleInstance          = new Title(overlayInstance);
        const urlInstance            = new Url(overlayInstance);
        const descriptionInstance    = new Description(overlayInstance);
        const colorInstance          = new Color(overlayInstance);
        const layerInstance          = new Layer(overlayInstance);
        const iconInstance           = new Icon(overlayInstance);
        const imageInstance          = new Image(overlayInstance);

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

        // Create image overlay
        const editImageOverlayFactoryInstance = new EditImageOverlayFactory(
            editInstance,
            overlayInstance,
            titleInstance,
            layerInstance,
            imageInstance
        );

        const imageOverlayFactoryInstance = new ImageOverlayFactory(
            mapInstance,
            createImageOverlayInstance,
            editImageOverlayFactoryInstance,
            new ImageOverlaysList(container, mapInstance),
            new ImageOverlayBoundsAndRatioCalculator(mapInstance),
            new ImageOverlayResize(mapInstance, createMarkerInstance),
            new ImageOverlayMove(mapInstance, createMarkerInstance)
        );

        // Main
        const OptionCreateLayerGroupInstance = new OptionCreateLayerGroup(
            container,
            handleSelectedInstance,
            layerGroupFactoryInstance
        );

        const OptionCreateImageOverlayInstance = new OptionCreateImageOverlay(
            container,
            handleSelectedInstance,
            imageOverlayFactoryInstance
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
            new LoadImageOverlays(imageOverlayFactoryInstance),
            new LoadStartPosition(OptionSetStartPositionInstance)
        );

        new SaveHiddenField(
            hiddenField,
            new SaveLayerGroups(),
            new SaveMarkers(),
            new SaveImageOverlays(),
            new SaveStartPostion(OptionSetStartPositionInstance)
        );
    }
}

export default Main;