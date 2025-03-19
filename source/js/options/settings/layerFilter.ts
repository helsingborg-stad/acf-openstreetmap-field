import { Setting } from "./setting";

class LayerFilter implements Setting {
    container: HTMLElement|null;
    setting: HTMLInputElement|undefined|null;

    constructor(
        container: HTMLElement,
        private layerFilterTitleInstance: LayerFilterTitleInterface
    ) {
        this.container = container.querySelector('[data-js-setting-layer-filter]');
        this.setting = this.container?.querySelector('input');

        this.setListener();
    }

    private setListener(): void {
        this.setting?.addEventListener('change', (e) => {
            this.shouldShowTitleSetting();
        });
    }

    private shouldShowTitleSetting(): void {
        if (!this.setting) {
            return;
        }

        this.setting.checked ? this.layerFilterTitleInstance.show() : this.layerFilterTitleInstance.hide();
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
        this.shouldShowTitleSetting();
    }
}

export default LayerFilter;