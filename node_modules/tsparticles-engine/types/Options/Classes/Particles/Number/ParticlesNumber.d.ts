import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IParticlesNumber } from "../../../Interfaces/Particles/Number/IParticlesNumber";
import { ParticlesDensity } from "./ParticlesDensity";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class ParticlesNumber implements IParticlesNumber, IOptionLoader<IParticlesNumber> {
    density: ParticlesDensity;
    limit: number;
    value: number;
    constructor();
    get max(): number;
    set max(value: number);
    load(data?: RecursivePartial<IParticlesNumber>): void;
}
