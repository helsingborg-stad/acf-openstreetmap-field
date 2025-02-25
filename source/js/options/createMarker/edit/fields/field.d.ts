interface Field {
    getContainer(): HTMLElement|null;
    getField(): HTMLInputElement|HTMLTextAreaElement|null;
    setValue(value: string): void;
    getValue(): string;
    showField(): void;
    hideField(): void;
}