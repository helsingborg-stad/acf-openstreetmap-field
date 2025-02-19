import { createMap } from '../OpenStreetMap/js/map';
import { MapInterface } from '../OpenStreetMap/js/mapInterface';
import { CreateMarker } from '../OpenStreetMap/js/features/createMarker/createMarker';

import HandleSelected from './options/handleSelected';
import OptionCreateMarker from './options/option/optionCreateMarker';
import OptionSetStartPosition from './options/option/optionSetStartPosition';

class Main {
    mapInstance: MapInterface;

    constructor(
        private id: string,
        private container: HTMLElement,
        private map: HTMLElement
    ) {
        this.mapInstance = createMap({
            id: this.id
        });

        const createMarkerInstance  = new CreateMarker(this.mapInstance);

        const handleSelectedInstance = new HandleSelected(this.container);

        const OptionCreateMarkerInstance = new OptionCreateMarker(
            this.mapInstance, 
            handleSelectedInstance,
            createMarkerInstance
        );
        const OptionSetStartPositionInstance = new OptionSetStartPosition(
            this.mapInstance,
            handleSelectedInstance,
            createMarkerInstance
        );

        // const selectInstance = new Select(
        //     [
        //         new OptionCreateMarker(),
        //         new OptionSetStartPosition()
        //     ]
        // );

        // this.mapInstance.getMap().on('click', (e: any) => {
        //     const marker = createMarkerInstance.create({
        //         position: e.latlng,
        //         icon: '<div class="marker">M</div>',
        //         className: 'marker'
        //     });
        //     marker.addTo(this.mapInstance.getMap());
            
        //     console.log(e.latlng);
        // });
    }
}

export default Main;