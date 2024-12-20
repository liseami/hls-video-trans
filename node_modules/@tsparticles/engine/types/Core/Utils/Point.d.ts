import type { ICoordinates } from "../Interfaces/ICoordinates.js";
import type { Particle } from "../Particle.js";
export declare class Point {
    readonly particle: Particle;
    readonly position: ICoordinates;
    constructor(position: ICoordinates, particle: Particle);
}
