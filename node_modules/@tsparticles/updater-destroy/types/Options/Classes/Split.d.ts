import { type IOptionLoader, type IParticlesOptions, type IRangeHsl, OptionsColor, type RecursivePartial, type SingleOrMultiple } from "@tsparticles/engine";
import type { ISplit } from "../Interfaces/ISplit.js";
import { SplitFactor } from "./SplitFactor.js";
import { SplitRate } from "./SplitRate.js";
export declare class Split implements ISplit, IOptionLoader<ISplit> {
    color?: OptionsColor;
    colorOffset?: Partial<IRangeHsl>;
    count: number;
    factor: SplitFactor;
    particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
    rate: SplitRate;
    sizeOffset: boolean;
    constructor();
    load(data?: RecursivePartial<ISplit>): void;
}
