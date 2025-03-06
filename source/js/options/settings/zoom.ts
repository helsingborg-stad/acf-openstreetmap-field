import { MapInterface } from "@helsingborg-stad/openstreetmap";

class Zoom implements Setting {
    container: HTMLElement|null;
    setting: HTMLInputElement|undefined|null;

    constructor(private mapInstance: MapInterface, container: HTMLElement) {
        this.container = container.querySelector('[data-js-setting-zoom]');
        this.setting = this.container?.querySelector('input');

        this.setListener();
    }

    public getValue(): string {
        return this.setting?.value ?? "16";
    }

    private setListener(): void {
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

export default Zoom;