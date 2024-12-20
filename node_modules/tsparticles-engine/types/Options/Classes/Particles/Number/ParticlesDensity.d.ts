import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IParticlesDensity } from "../../../Interfaces/Particles/Number/IParticlesDensity";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class ParticlesDensity implements IParticlesDensity, IOptionLoader<IParticlesDensity> {
    enable: boolean;
    height: number;
    width: number;
    constructor();
    get area(): number;
    set area(value: number);
    get factor(): number;
    set factor(value: number);
    get value_area(): number;
    set value_area(value: number);
    load(data?: RecursivePartial<IParticlesDensity>): void;
}
