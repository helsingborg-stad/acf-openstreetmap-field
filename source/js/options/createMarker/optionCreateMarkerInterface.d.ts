interface OptionCreateMarkerInterface {
    getMarkers(): Record<string, MarkerDataInterface>;
    addMarker(marker: MarkerInterface): void;
    removeMarker(id: string): void;
}