type ImageOverlaysDataStorage = { [id: string]: ImageOverlayDataInterface };

interface ImageOverlayDataInterface {
    
    editImageOverlay(): void;
    setTitle(title: string): void;
    getTitle(): string;
    setLayerGroup(layerGroup: string): void;
    getLayerGroup(): string;
    setImage(image: string): void;
    getImage(): string;
    updateImageOverlay(): void;
    deleteImageOverlay(): void;
    getId(): string;
}