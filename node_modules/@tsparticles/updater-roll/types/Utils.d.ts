import { type Engine, type IDelta } from "@tsparticles/engine";
import type { RollParticle } from "./Types.js";
export declare function initParticle(engine: Engine, particle: RollParticle): void;
export declare function updateRoll(particle: RollParticle, delta: IDelta): void;
