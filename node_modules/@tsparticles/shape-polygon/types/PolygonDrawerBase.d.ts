import { type ICoordinates, type IShapeDrawData, type IShapeDrawer, type Particle } from "@tsparticles/engine";
import type { ISide } from "./ISide.js";
export declare abstract class PolygonDrawerBase implements IShapeDrawer {
    abstract readonly validTypes: readonly string[];
    draw(data: IShapeDrawData): void;
    getSidesCount(particle: Particle): number;
    abstract getCenter(particle: Particle, radius: number): ICoordinates;
    abstract getSidesData(particle: Particle, radius: number): ISide;
}
