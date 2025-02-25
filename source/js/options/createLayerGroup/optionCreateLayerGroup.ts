class OptionCreateLayerGroup implements OptionFeature {
    protected condition: string = 'create_layer_group';
    constructor(
        private container: HTMLElement,
        private handleSelectedInstance: HandleSelectedInterface
    ) {
        this.addListener();
    }

    private addListener() {
        this.container.querySelector('[data-js-value="create_layer_group"]')?.addEventListener('click', (e) => {
            e.preventDefault();
            
        });
    }

    public checkCondition(value: string): boolean {
        return value === this.condition;
    }
}

export default OptionCreateLayerGroup;