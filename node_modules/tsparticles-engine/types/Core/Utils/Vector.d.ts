import type { ICoordinates } from "../Interfaces/ICoordinates";
import { Vector3d } from "./Vector3d";
export declare class Vector extends Vector3d {
    protected constructor(xOrCoords: number | ICoordinates, y?: number);
    static get origin(): Vector;
    static clone(source: Vector): Vector;
    static create(x: number | ICoordinates, y?: number): Vector;
}
