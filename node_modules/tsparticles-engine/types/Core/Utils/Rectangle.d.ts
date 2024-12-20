import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { IDimension } from "../Interfaces/IDimension";
import { Range } from "./Range";
export declare class Rectangle extends Range {
    readonly size: IDimension;
    constructor(x: number, y: number, width: number, height: number);
    contains(point: ICoordinates): boolean;
    intersects(range: Range): boolean;
}
