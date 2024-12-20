import type { IColorAnimation } from "./IColorAnimation";
import type { IHslAnimation } from "./IHslAnimation";
import type { IOptionsColor } from "./IOptionsColor";
export interface IAnimatableColor extends IOptionsColor {
    animation: IColorAnimation | IHslAnimation;
}
