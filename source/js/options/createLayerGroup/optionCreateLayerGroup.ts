class OptionCreateLayerGroup implements OptionFeature {
    protected condition: string = 'create_layer_group';
    constructor(
        private container: HTMLElement
    ) {
        this.addListener();
    }

    private addListener() {
        this.container.querySelector('[data-js-value="create_layer_group"]')?.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("click");
        });
    }

    public checkCondition(value: string): boolean {
        return value === this.condition;
    }
}

export default OptionCreateLayerGroup;