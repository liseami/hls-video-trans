import type { ISizeAnimation } from "./ISizeAnimation.js";
import type { IValueWithRandom } from "../../IValueWithRandom.js";
export interface ISize extends IValueWithRandom {
    animation: ISizeAnimation;
}
