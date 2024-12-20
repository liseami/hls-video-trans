import type { ICoordinates, IRangedCoordinates } from "./ICoordinates";
import type { IDimension } from "./IDimension";
export interface IPositionFromSizeParams {
    position?: Partial<ICoordinates>;
    size: IDimension;
}
export interface IRangedPositionFromSizeParams {
    position?: Partial<IRangedCoordinates>;
    size: IDimension;
}
