import { type IOptionLoader, OptionsColor, type RangeValue, type RecursivePartial } from "@tsparticles/engine";
import type { ITwinkleValues } from "../Interfaces/ITwinkleValues.js";
export declare class TwinkleValues implements ITwinkleValues, IOptionLoader<ITwinkleValues> {
    color?: OptionsColor;
    enable: boolean;
    frequency: number;
    opacity: RangeValue;
    constructor();
    load(data?: RecursivePartial<ITwinkleValues>): void;
}
