import { AnimationOptions } from "./AnimationOptions.js";
import type { IColorAnimation } from "../Interfaces/IColorAnimation.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
export declare class ColorAnimation extends AnimationOptions implements IColorAnimation, IOptionLoader<IColorAnimation> {
    offset: RangeValue;
    constructor();
    load(data?: RecursivePartial<IColorAnimation>): void;
}
