import { createMap, Config } from '@helsingborg-stad/openstreetmap';
import { MapInterface } from '@helsingborg-stad/openstreetmap/dist/types/map';

class Main {
    mapInstance: MapInterface;
    constructor(
        private id: string,
        private element: HTMLElement
    ) {
        this.mapInstance = createMap(new Config({
            id: this.id
        }));
    }
}

export default Main;