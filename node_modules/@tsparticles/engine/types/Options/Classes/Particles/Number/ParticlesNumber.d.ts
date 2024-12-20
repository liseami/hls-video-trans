import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IParticlesNumber } from "../../../Interfaces/Particles/Number/IParticlesNumber.js";
import { ParticlesDensity } from "./ParticlesDensity.js";
import { ParticlesNumberLimit } from "./ParticlesNumberLimit.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class ParticlesNumber implements IParticlesNumber, IOptionLoader<IParticlesNumber> {
    readonly density: ParticlesDensity;
    limit: ParticlesNumberLimit;
    value: number;
    constructor();
    load(data?: RecursivePartial<IParticlesNumber>): void;
}
