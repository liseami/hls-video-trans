import { AnimationOptions, RangedAnimationOptions } from "./AnimationOptions.js";
import type { IAnimationValueWithRandom, IRangedAnimationValueWithRandom, IValueWithRandom } from "../Interfaces/IValueWithRandom.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
export declare class ValueWithRandom implements IValueWithRandom, IOptionLoader<IValueWithRandom> {
    value: RangeValue;
    constructor();
    load(data?: RecursivePartial<IValueWithRandom>): void;
}
export declare class AnimationValueWithRandom extends ValueWithRandom implements IOptionLoader<IAnimationValueWithRandom> {
    readonly animation: AnimationOptions;
    constructor();
    load(data?: RecursivePartial<IAnimationValueWithRandom>): void;
}
export declare class RangedAnimationValueWithRandom extends AnimationValueWithRandom implements IOptionLoader<IRangedAnimationValueWithRandom> {
    readonly animation: RangedAnimationOptions;
    constructor();
    load(data?: RecursivePartial<IRangedAnimationValueWithRandom>): void;
}
