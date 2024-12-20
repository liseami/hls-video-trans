import { type BaseRange, Circle, type ICoordinates, type IDimension } from "@tsparticles/engine";
export declare class CircleWarp extends Circle {
    private readonly canvasSize;
    constructor(x: number, y: number, radius: number, canvasSize: IDimension);
    contains(point: ICoordinates): boolean;
    intersects(range: BaseRange): boolean;
}
