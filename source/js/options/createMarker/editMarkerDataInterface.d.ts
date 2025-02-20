interface EditMarkerDataInterface {
    setCurrentMarker(markerData: MarkerDataInterface): void;
    showOverlay(): void;
    hideOverlay(): void;
    setTitleValue(value: string): void;
    setUrlValue(value: string): void;
    setDescriptionValue(value: string): void;
}