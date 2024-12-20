import type { IAnimation } from "./IAnimation.js";
import type { RangeValue } from "../../Types/RangeValue.js";
export interface IColorAnimation extends IAnimation {
    offset: RangeValue;
}
