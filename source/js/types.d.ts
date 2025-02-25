import { LatLngObject } from "../OpenStreetMap/js/types"

type SavedMarkerData = {
    title: string;
    description: string;
    url: string;
    position: LatLngObject;
}[];

type SaveStartPosition = LatLngObject|null;

type SaveData = {
    markers: SavedMarkerData;
    startPosition: SaveStartPosition;
}
