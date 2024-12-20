import { type Container, type IShapeDrawData, type IShapeDrawer } from "@tsparticles/engine";
import type { CircleParticle } from "./CircleParticle.js";
export declare class CircleDrawer implements IShapeDrawer<CircleParticle> {
    readonly validTypes: readonly ["circle"];
    draw(data: IShapeDrawData<CircleParticle>): void;
    getSidesCount(): number;
    particleInit(container: Container, particle: CircleParticle): void;
}
