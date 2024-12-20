import type { IParticlesDensity } from "./IParticlesDensity.js";
import type { IParticlesNumberLimit } from "./IParticlesNumberLimit.js";
export interface IParticlesNumber {
    density: IParticlesDensity;
    limit: IParticlesNumberLimit;
    value: number;
}
