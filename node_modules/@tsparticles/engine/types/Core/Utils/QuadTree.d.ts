import { type BaseRange, Rectangle } from "./Ranges.js";
import type { ICoordinates } from "../Interfaces/ICoordinates.js";
import type { IDimension } from "../Interfaces/IDimension.js";
import type { Particle } from "../Particle.js";
import type { Point } from "./Point.js";
export declare class QuadTree {
    readonly rectangle: Rectangle;
    readonly capacity: number;
    private _divided;
    private readonly _points;
    private readonly _subs;
    constructor(rectangle: Rectangle, capacity: number);
    insert(point: Point): boolean;
    query(range: BaseRange, check?: (particle: Particle) => boolean): Particle[];
    queryCircle(position: ICoordinates, radius: number, check?: (particle: Particle) => boolean): Particle[];
    queryRectangle(position: ICoordinates, size: IDimension, check?: (particle: Particle) => boolean): Particle[];
    private readonly _subdivide;
}
