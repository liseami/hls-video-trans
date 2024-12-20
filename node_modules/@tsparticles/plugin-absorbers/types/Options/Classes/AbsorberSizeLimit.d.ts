import { type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import type { IAbsorberSizeLimit } from "../Interfaces/IAbsorberSizeLimit.js";
export declare class AbsorberSizeLimit implements IAbsorberSizeLimit, IOptionLoader<IAbsorberSizeLimit> {
    mass: number;
    radius: number;
    constructor();
    load(data?: RecursivePartial<IAbsorberSizeLimit>): void;
}
