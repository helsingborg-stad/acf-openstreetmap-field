interface UrlInterface {
    getUrlField(): HTMLInputElement|null;
    setUrlValue(value: string): void;
    getUrlValue(): string;
}