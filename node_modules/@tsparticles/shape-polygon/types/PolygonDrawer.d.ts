import type { ICoordinates, Particle } from "@tsparticles/engine";
import type { ISide } from "./ISide.js";
import { PolygonDrawerBase } from "./PolygonDrawerBase.js";
export declare class PolygonDrawer extends PolygonDrawerBase {
    readonly validTypes: readonly ["polygon"];
    getCenter(particle: Particle, radius: number): ICoordinates;
    getSidesData(particle: Particle, radius: number): ISide;
}
