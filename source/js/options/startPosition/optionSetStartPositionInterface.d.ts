import { MapInterface, CreateMarkerInterface, MarkerInterface } from "@helsingborg-stad/openstreetmap";

interface OptionSetStartPositionInterface {
    getStartPositionMarker(): MarkerInterface|undefined;
    addMarker(latlng: LatLngObject): void;
    isDragging(): boolean;
}