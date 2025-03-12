class MaterialSymbolFactory implements IconFactoryInterface {
    private className: string = 'edit-icon';
    private mapIconNameMap(icon: string) {
        const map: IconMap = {
            'location': 'location_on',
            'resize': 'open_in_full',
            'move': 'drag_pan',
            'edit': 'edit'
        }

        return map[icon as keyof IconMap] ?? icon;
    }

    public create(icon: string, color: string, size: number = 20, background: boolean = true): string {
        const iconName = this.mapIconNameMap(icon);

        return background ? this.withBackground(iconName, color, size) : this.withoutBackground(iconName, color, size);
    }

    private withoutBackground(iconName: string, color: string, size: number): string {
        return `<span style="color: ${color}; font-size: ${size}px;" data-material-symbol="${iconName}" class="${this.className} material-symbols material-symbols-rounded material-symbols-sharp material-symbols-outlined material-symbols--filled">${iconName}</span>`;
    }

    private withBackground(iconName: string, color: string, size: number): string {
        return `<span style="background-color: ${color}; color: white; font-size: ${size}px; padding: 4px; border-radius: 50%;" data-material-symbol="${iconName}" class="${this.className} material-symbols material-symbols-rounded material-symbols-sharp material-symbols-outlined material-symbols--filled">${iconName}</span>`;
    }
}

export default MaterialSymbolFactory;