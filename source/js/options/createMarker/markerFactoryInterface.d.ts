import { MarkerDataInterface } from "./markerDataInterface";

interface MarkerFactoryInterface {
    create(marker: MarkerInterface, id: string): MarkerDataInterface;
}