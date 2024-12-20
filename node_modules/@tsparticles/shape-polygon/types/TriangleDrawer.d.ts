import type { ICoordinates, Particle } from "@tsparticles/engine";
import type { ISide } from "./ISide.js";
import { PolygonDrawerBase } from "./PolygonDrawerBase.js";
export declare class TriangleDrawer extends PolygonDrawerBase {
    readonly validTypes: readonly ["triangle"];
    getCenter(particle: Particle, radius: number): ICoordinates;
    getSidesCount(): number;
    getSidesData(particle: Particle, radius: number): ISide;
}
