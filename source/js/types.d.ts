import { LatLngObject, LatLngBoundsObject } from "@helsingborg-stad/openstreetmap";

type SavedLayerGroup = {
    title: string;
    color: string;
    layerGroup: string;
    id: string;
}[];

type SavedMarkerData = {
    title: string;
    description: string;
    url: string;
    position: LatLngObject;
    layerGroup: string;
}[];

type SavedImageOverlayData = {
    title: string;
    image: string;
    position: LatLngBoundsObject;
    layerGroup: string;
    aspectRatio: number;
}[];

type SavedStartPosition = LatLngObject|null;

type SaveData = {
    layerGroups: SavedLayerGroup;
    markers: SavedMarkerData;
    imageOverlays: SavedImageOverlayData;
    startPosition: SavedStartPosition;
}
