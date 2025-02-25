interface Field {
    getField(): HTMLInputElement|HTMLTextAreaElement|null;
    setValue(value: string): void;
    getValue(): string;
    showField(): void;
    hideField(): void;
}