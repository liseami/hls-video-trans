import type { ICoordinates } from "../Interfaces/ICoordinates";
import { Range } from "./Range";
export declare class Circle extends Range {
    readonly radius: number;
    constructor(x: number, y: number, radius: number);
    contains(point: ICoordinates): boolean;
    intersects(range: Range): boolean;
}
