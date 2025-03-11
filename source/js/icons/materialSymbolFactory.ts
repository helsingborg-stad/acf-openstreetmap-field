class MaterialSymbolFactory implements IconFactoryInterface {
    private mapIconNameMap(icon: string) {
        const map: IconMap = {
            'location': 'location_on',
            'resize': 'open_in_full',
            'move': 'drag_pan',
            'edit': 'edit'
        }

        return map[icon as keyof IconMap] ?? icon;
    }

    public create(icon: string, color: string, size: number|null = null): string {
        const iconName = this.mapIconNameMap(icon);

        return `<span style="color: ${color}; font-size: ${size ?? 32}px;" data-material-symbol="${iconName}" class="material-symbols material-symbols-rounded material-symbols-sharp material-symbols-outlined material-symbols--filled">${iconName}</span>`;
    }
}

export default MaterialSymbolFactory;