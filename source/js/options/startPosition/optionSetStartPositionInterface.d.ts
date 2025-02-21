import { CreateMarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/createMarkerInterface";
import { MarkerInterface } from "../../../OpenStreetMap/js/features/createMarker/markerInterface";
import { MapInterface } from "../../../OpenStreetMap/js/mapInterface";

interface OptionSetStartPositionInterface {
    getStartPosition(): MarkerInterface|undefined;
}