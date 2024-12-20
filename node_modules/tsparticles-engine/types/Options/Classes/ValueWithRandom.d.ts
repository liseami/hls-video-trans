import { AnimationOptions, RangedAnimationOptions } from "./AnimationOptions";
import type { IAnimationValueWithRandom, IRangedAnimationValueWithRandom, IValueWithRandom } from "../Interfaces/IValueWithRandom";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import { Random } from "./Random";
import type { RangeValue } from "../../Types/RangeValue";
import type { RecursivePartial } from "../../Types/RecursivePartial";
export declare class ValueWithRandom implements IValueWithRandom, IOptionLoader<IValueWithRandom> {
    random: Random;
    value: RangeValue;
    constructor();
    load(data?: RecursivePartial<IValueWithRandom>): void;
}
export declare class AnimationValueWithRandom extends ValueWithRandom implements IOptionLoader<IAnimationValueWithRandom> {
    animation: AnimationOptions;
    constructor();
    get anim(): AnimationOptions;
    set anim(value: AnimationOptions);
    load(data?: RecursivePartial<IAnimationValueWithRandom>): void;
}
export declare class RangedAnimationValueWithRandom extends AnimationValueWithRandom implements IOptionLoader<IRangedAnimationValueWithRandom> {
    animation: RangedAnimationOptions;
    constructor();
    load(data?: RecursivePartial<IRangedAnimationValueWithRandom>): void;
}
