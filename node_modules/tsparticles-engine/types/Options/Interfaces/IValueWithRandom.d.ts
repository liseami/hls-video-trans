import type { IAnimation, IRangedAnimation } from "./IAnimation";
import type { IRandom } from "./IRandom";
import type { RangeValue } from "../../Types/RangeValue";
export interface IValueWithRandom {
    random: boolean | IRandom;
    value: RangeValue;
}
export interface IAnimationValueWithRandom extends IValueWithRandom {
    anim: IAnimation;
    animation: IAnimation;
}
export interface IRangedAnimationValueWithRandom extends IAnimationValueWithRandom {
    anim: IRangedAnimation;
    animation: IRangedAnimation;
}
