import { type IDelta, type IParticleMover, type Particle } from "@tsparticles/engine";
import type { MoveParticle } from "./Types.js";
export declare class BaseMover implements IParticleMover {
    init(particle: MoveParticle): void;
    isEnabled(particle: Particle): boolean;
    move(particle: MoveParticle, delta: IDelta): void;
}
