import { type IOptionLoader, type IParticlesOptions, type RecursivePartial } from "@tsparticles/engine";
import type { ITrail } from "../Interfaces/ITrail.js";
export declare class Trail implements ITrail, IOptionLoader<ITrail> {
    delay: number;
    particles?: RecursivePartial<IParticlesOptions>;
    pauseOnStop: boolean;
    quantity: number;
    constructor();
    load(data?: RecursivePartial<ITrail>): void;
}
