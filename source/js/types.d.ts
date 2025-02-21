import { LatLngObject } from "../OpenStreetMap/js/types"

type SaveMarkerData = {
    title: string;
    description: string;
    url: string;
    position: LatLngObject;
}[];

type SaveStartPosition = LatLngObject|null;

type SaveData = {
    markers: SaveMarkerData;
    startPosition: SaveStartPosition;
}
