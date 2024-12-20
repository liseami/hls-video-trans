import type { IOpacityAnimation } from "./IOpacityAnimation.js";
import type { IValueWithRandom } from "../../IValueWithRandom.js";
export interface IOpacity extends IValueWithRandom {
    animation: IOpacityAnimation;
}
