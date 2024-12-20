import type { ISizeAnimation } from "./ISizeAnimation";
import type { IValueWithRandom } from "../../IValueWithRandom";
export interface ISize extends IValueWithRandom {
    anim: ISizeAnimation;
    animation: ISizeAnimation;
}
