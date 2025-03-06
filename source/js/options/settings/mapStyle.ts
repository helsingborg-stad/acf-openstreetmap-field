import { MapInterface } from "@helsingborg-stad/openstreetmap";

class MapStyle implements Setting {
    container: HTMLElement|null;
    setting: HTMLSelectElement|undefined|null;

    constructor(private mapInstance: MapInterface, container: HTMLElement) {
        this.container = container.querySelector('[data-js-setting-map-style]');
        this.setting = this.container?.querySelector('select');

        this.setListener();
    }

    public getValue(): string {
        console.log(this.setting?.value);
        return this.setting?.value ?? "16";
    }

    private setListener(): void {
        console.log(this.setting);
        if (!this.setting) {
            return;
        }

        this.setting.addEventListener('input', (e) => {
            this.mapInstance.setZoom(parseInt(this.setting?.value ?? "16"));
        });
    }

    public save(): string {
        if (!this.setting || !this.setting.value) {
            return "16";
        }

        return this.setting.value;
    }

    public load(value: string): void {
        if (!this.setting) {
            return;
        }

        this.setting.value = value;
    }
}

export default MapStyle;