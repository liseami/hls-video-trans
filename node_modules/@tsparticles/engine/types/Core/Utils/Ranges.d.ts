import type { ICoordinates } from "../Interfaces/ICoordinates.js";
import type { IDimension } from "../Interfaces/IDimension.js";
export declare abstract class BaseRange {
    readonly position: ICoordinates;
    readonly type: string;
    protected constructor(x: number, y: number, type: string);
    abstract contains(point: ICoordinates): boolean;
    abstract intersects(range: BaseRange): boolean;
}
export declare class Circle extends BaseRange {
    readonly radius: number;
    constructor(x: number, y: number, radius: number);
    contains(point: ICoordinates): boolean;
    intersects(range: BaseRange): boolean;
}
export declare class Rectangle extends BaseRange {
    readonly size: IDimension;
    constructor(x: number, y: number, width: number, height: number);
    contains(point: ICoordinates): boolean;
    intersects(range: BaseRange): boolean;
}
