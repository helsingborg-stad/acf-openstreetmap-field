declare const acf: any;

class Save {
    constructor(
        private container: HTMLElement,
        private createMarker: OptionCreateMarkerInterface,
        private setStartPosition: any
    ) {
        const hiddenField = this.container.querySelector('[data-js-hidden-field]');
        
        acf.add_filter('validation_complete', (json: any, form: any) => {
            
            return json;
        });
    }
}

export default Save;