import { LatLngObject } from "../OpenStreetMap/js/types";

type SavedLayerGroup = {
    title: string;
    id: number;
}[];

type SavedMarkerData = {
    title: string;
    description: string;
    url: string;
    position: LatLngObject;
}[];

type SaveStartPosition = LatLngObject|null;

type SaveData = {
    layerGroups: SavedLayerGroup;
    markers: SavedMarkerData;
    startPosition: SaveStartPosition;
}
