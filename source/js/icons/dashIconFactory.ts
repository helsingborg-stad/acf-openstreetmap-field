class DashIconFactory implements IconFactoryInterface {
    private mapIconNameMap(icon: string) {
        const map: IconMap = {
            'location': 'location',
            'resize': 'leftright',
            'move': 'move',
            'edit': 'edit'
        }

        return map[icon as keyof IconMap] ?? icon;
    }

    public create(icon: string, color: string, size: number = 20): string {
        const iconName = this.mapIconNameMap(icon);

        return `<span style="font-size: ${size}px; padding: 4px; display: flex; justify-content: center; align-items: center; background-color: ${color}; border-radius: 50%; color: white;" class="dashicons dashicons-${iconName}"></span>`;
    }
}

export default DashIconFactory;