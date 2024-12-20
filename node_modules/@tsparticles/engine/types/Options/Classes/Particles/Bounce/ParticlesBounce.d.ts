import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IParticlesBounce } from "../../../Interfaces/Particles/Bounce/IParticlesBounce.js";
import { ParticlesBounceFactor } from "./ParticlesBounceFactor.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class ParticlesBounce implements IParticlesBounce, IOptionLoader<IParticlesBounce> {
    readonly horizontal: ParticlesBounceFactor;
    readonly vertical: ParticlesBounceFactor;
    constructor();
    load(data?: RecursivePartial<IParticlesBounce>): void;
}
