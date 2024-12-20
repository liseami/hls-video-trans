import type { ICoordinates, IRangedCoordinates } from "./ICoordinates.js";
import type { IDimension } from "./IDimension.js";
export interface IPositionFromSizeParams {
    position?: Partial<ICoordinates>;
    size: IDimension;
}
export interface IRangedPositionFromSizeParams {
    position?: Partial<IRangedCoordinates>;
    size: IDimension;
}
