import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IParticlesDensity } from "../../../Interfaces/Particles/Number/IParticlesDensity.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class ParticlesDensity implements IParticlesDensity, IOptionLoader<IParticlesDensity> {
    enable: boolean;
    height: number;
    width: number;
    constructor();
    load(data?: RecursivePartial<IParticlesDensity>): void;
}
