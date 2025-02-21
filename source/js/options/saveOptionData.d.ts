import { SaveStartPosition } from "../types";

interface SaveOptionDataInterface {
    save(): SaveMarkerData|SaveStartPosition;
}