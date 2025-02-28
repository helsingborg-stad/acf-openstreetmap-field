interface ImageOverlayDataInterface {
    createImageOverlay(): void;
    editImageOverlay(): void;
    getId(): string;
    setTitle(title: string): void;
    getTitle(): string;
    getLayerGroup(): string;
    setLayerGroup(layerGroup: string): void;
    updateImageOverlay(): void;
    deleteImageOverlay(): void;
}