interface DescriptionInterface {
    getDescriptionField(): HTMLTextAreaElement|null;
    setDescriptionValue(value: string): void;
    getDescriptionValue(): string;
}