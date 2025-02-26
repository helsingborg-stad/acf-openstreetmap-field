class FieldValidator {
    public validateUrl(url: string): boolean {
        if (!url) {
            return true;
        }

        // TODO: Translations
        try {
            new URL(url);
            return true;
        } catch (error) {
            alert('Invalid URL, should follow the format: https://example.com');
            return false;
        }
    }
}

export default FieldValidator;