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

    public create(icon: string, color: string, size: number = 20): string {
        const iconName = this.mapIconNameMap(icon);

        return `<span style="background-color: ${color}; color: white; font-size: ${size}px; padding: 4px; border-radius: 50%;" data-material-symbol="${iconName}" class="material-symbols material-symbols-rounded material-symbols-sharp material-symbols-outlined material-symbols--filled">${iconName}</span>`;
    }
}

export default MaterialSymbolFactory;