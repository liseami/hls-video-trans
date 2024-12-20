import { type IOptionLoader, type RecursivePartial, ValueWithRandom } from "@tsparticles/engine";
import { AbsorberSizeLimit } from "./AbsorberSizeLimit.js";
import type { IAbsorberSize } from "../Interfaces/IAbsorberSize.js";
export declare class AbsorberSize extends ValueWithRandom implements IAbsorberSize, IOptionLoader<IAbsorberSize> {
    density: number;
    limit: AbsorberSizeLimit;
    constructor();
    load(data?: RecursivePartial<IAbsorberSize>): void;
}
