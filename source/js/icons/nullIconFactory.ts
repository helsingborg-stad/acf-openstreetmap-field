class NullIconFactory implements IconFactoryInterface {
    private mapIconNameMap(icon: string): string|null {
        const map: IconMap = {
            'location': '📍',
            'resize': '⇲',
            'move': '❖',
            'edit': '✎'
        }

        return map[icon as keyof IconMap] ?? null;
    }

    public create(icon: string, color: string, size: number = 20): string {
        const iconName = this.mapIconNameMap(icon);

        return `<span style="display: flex; justify-content: center; align-items: center; width: 24px; height: 24px; font-size: ${size}px; padding: 4px; background-color: ${color}; border-radius: 50%;">${iconName ?? '📍'}</span>`;
    }
}

export default NullIconFactory;