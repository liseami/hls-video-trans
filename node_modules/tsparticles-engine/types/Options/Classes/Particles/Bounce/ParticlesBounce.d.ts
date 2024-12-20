import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IParticlesBounce } from "../../../Interfaces/Particles/Bounce/IParticlesBounce";
import { ParticlesBounceFactor } from "./ParticlesBounceFactor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class ParticlesBounce implements IParticlesBounce, IOptionLoader<IParticlesBounce> {
    horizontal: ParticlesBounceFactor;
    vertical: ParticlesBounceFactor;
    constructor();
    load(data?: RecursivePartial<IParticlesBounce>): void;
}
