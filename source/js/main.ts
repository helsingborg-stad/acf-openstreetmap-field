import { createMap, Config, MapInterface } from '@helsingborg-stad/openstreetmap';
import HandleOptions from './options/handleOptions';

class Main {
    mapInstance: MapInterface;

    constructor(
        private id: string,
        private container: HTMLElement,
        private map: HTMLElement
    ) {
        new HandleOptions(this.container);

        this.mapInstance = createMap(new Config({
            id: this.id
        }));

        this.mapInstance.getMap().on('click', (e) => {
            console.log(e);
        });
    }
}

export default Main;