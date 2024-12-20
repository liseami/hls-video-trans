import type { IColorAnimation } from "./IColorAnimation.js";
import type { IHslAnimation } from "./IHslAnimation.js";
import type { IOptionsColor } from "./IOptionsColor.js";
export interface IAnimatableColor extends IOptionsColor {
    animation: IColorAnimation | IHslAnimation;
}
