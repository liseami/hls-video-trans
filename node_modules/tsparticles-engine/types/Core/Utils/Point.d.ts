import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { Particle } from "../Particle";
export declare class Point {
    readonly position: ICoordinates;
    readonly particle: Particle;
    constructor(position: ICoordinates, particle: Particle);
}
