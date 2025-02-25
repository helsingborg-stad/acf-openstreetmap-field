import { SaveStartPosition } from "../types";

interface SaveOptionDataInterface {
    save(): SavedMarkerData|SaveStartPosition;
}