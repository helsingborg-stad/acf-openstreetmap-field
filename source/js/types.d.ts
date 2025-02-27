import { LatLngObject } from "../OpenStreetMap/js/types";

type SavedLayerGroup = {
    title: string;
    color: string;
    id: string;
}[];

type SavedMarkerData = {
    title: string;
    description: string;
    url: string;
    position: LatLngObject;
    layerGroup: string;
}[];

type SaveStartPosition = LatLngObject|null;

type SaveData = {
    layerGroups: SavedLayerGroup;
    markers: SavedMarkerData;
    startPosition: SaveStartPosition;
}
