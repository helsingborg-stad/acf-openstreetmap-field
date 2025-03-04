import { MapInterface, CreateMarkerInterface, MarkerInterface } from "@helsingborg-stad/openstreetmap";

interface OptionSetStartPositionInterface {
    getStartPosition(): MarkerInterface|undefined;
    addMarker(latlng: LatLngObject): void;
}