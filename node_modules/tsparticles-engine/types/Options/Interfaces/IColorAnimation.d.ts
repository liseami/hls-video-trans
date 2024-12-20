import type { IAnimation } from "./IAnimation";
import type { RangeValue } from "../../Types/RangeValue";
export interface IColorAnimation extends IAnimation {
    offset: RangeValue;
}
