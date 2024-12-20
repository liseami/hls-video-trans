import { type Container, type IShapeDrawData, type IShapeDrawer, type Particle } from "@tsparticles/engine";
import type { StarParticle } from "./StarParticle.js";
export declare class StarDrawer implements IShapeDrawer<StarParticle> {
    readonly validTypes: readonly ["star"];
    draw(data: IShapeDrawData<StarParticle>): void;
    getSidesCount(particle: Particle): number;
    particleInit(container: Container, particle: StarParticle): void;
}
