import { Setting } from "./setting";

class LayerFilter implements Setting {
    container: HTMLElement|null;
    setting: HTMLInputElement|undefined|null;

    constructor(
        container: HTMLElement
    ) {
        this.container = container.querySelector('[data-js-setting-layer-filter]');
        this.setting = this.container?.querySelector('input');
    }

    public getValue(): "true"|"false" {    
        return this.setting?.checked ? 'true' : 'false';
    }

    public save(): "true"|"false" {
        return this.getValue();
    }

    public load(value: string): void {
        if (!this.setting) {
            return;
        }

        this.setting.checked = value === "true";
    }
}

export default LayerFilter;