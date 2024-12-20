import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { IDimension } from "../Interfaces/IDimension";
import type { Particle } from "../Particle";
import type { Point } from "./Point";
import type { Range } from "./Range";
import { Rectangle } from "./Rectangle";
export declare class QuadTree {
    readonly rectangle: Rectangle;
    readonly capacity: number;
    private _divided;
    private readonly _points;
    private readonly _subs;
    constructor(rectangle: Rectangle, capacity: number);
    insert(point: Point): boolean;
    query(range: Range, check?: (particle: Particle) => boolean, found?: Particle[]): Particle[];
    queryCircle(position: ICoordinates, radius: number, check?: (particle: Particle) => boolean): Particle[];
    queryRectangle(position: ICoordinates, size: IDimension, check?: (particle: Particle) => boolean): Particle[];
    private readonly _subdivide;
}
