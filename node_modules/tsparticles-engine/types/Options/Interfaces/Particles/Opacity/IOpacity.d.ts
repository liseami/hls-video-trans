import type { IOpacityAnimation } from "./IOpacityAnimation";
import type { IValueWithRandom } from "../../IValueWithRandom";
export interface IOpacity extends IValueWithRandom {
    anim: IOpacityAnimation;
    animation: IOpacityAnimation;
}
