import { MarkerDataInterface } from "./markerDataInterface";
import { MarkersInterface } from "./markersInterface";

interface MarkerFactoryInterface {
    create(id: string, markersInstance: MarkersInterface): MarkerDataInterface;
}