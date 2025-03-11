import { CreateMarker, CreateLayerGroup, CreateImageOverlay, CreateMap, CreateTileLayer, TilesHelper, CreateAttribution } from '@helsingborg-stad/openstreetmap';
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
import Zoom from './options/settings/zoom';
import MapStyle from './options/settings/mapStyle';
import LayerFilter from './options/settings/layerFilter';
import IconFactoryResolver from './icons/iconFactoryResolver';


declare const acf: any;

class Main {
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

        const mapInstance = new CreateMap({
            id: id
        }).create();

        const iconFactoryInstance = new IconFactoryResolver().resolve();

        // Helpers
        const tilesHelperInstance = new TilesHelper();

        // MapTiles
        const tileLayerInstance    = new CreateTileLayer().create();
        const attributionInstance  = new CreateAttribution().create();

        // Settings
        const zoomInstance        = new Zoom(mapInstance, container);
        const mapStyleInstance    = new MapStyle(tileLayerInstance, attributionInstance, tilesHelperInstance, container);
        const layerFilterInstance = new LayerFilter(container);

        // General
        const createMarkerInstance       = new CreateMarker();
        const createLayerGroupInstance   = new CreateLayerGroup();
        const createImageOverlayInstance = new CreateImageOverlay();
        const handleSelectedInstance     = new HandleSelected(container);

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
            new MarkersList(container, mapInstance),
            iconFactoryInstance
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
            new ImageOverlayResize(mapInstance, createMarkerInstance, iconFactoryInstance),
            new ImageOverlayMove(mapInstance, createMarkerInstance, iconFactoryInstance)
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
            container,
            zoomInstance,
            handleSelectedInstance,
            createMarkerInstance,
            iconFactoryInstance
        );

        // Save and Load
        new LoadHiddenField(
            hiddenField,
            new LoadLayerGroups(layerGroupFactoryInstance),
            new LoadMarkers(markerFactoryInstance),
            new LoadImageOverlays(imageOverlayFactoryInstance),
            new LoadStartPosition(OptionSetStartPositionInstance),
            zoomInstance,
            mapStyleInstance,
            layerFilterInstance
        );

        new SaveHiddenField(
            hiddenField,
            new SaveLayerGroups(),
            new SaveMarkers(),
            new SaveImageOverlays(),
            new SaveStartPostion(OptionSetStartPositionInstance),
            zoomInstance,
            mapStyleInstance,
            layerFilterInstance
        );

        // After data loaded
        const currentTiles = tilesHelperInstance.getDefaultTiles(mapStyleInstance.getValue());
        tileLayerInstance.setUrl(currentTiles.url).addTo(mapInstance);
        attributionInstance.setPrefix(currentTiles.attribution).addTo(mapInstance);
        mapInstance.setView(OptionSetStartPositionInstance.getStartPositionMarker()?.getPosition() ?? { lat: 59.32932, lng: 18.06858 }, parseInt(zoomInstance.getValue()));

    }
}

export default Main;