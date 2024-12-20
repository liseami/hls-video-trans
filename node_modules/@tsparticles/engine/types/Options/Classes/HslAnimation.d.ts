import { ColorAnimation } from "./ColorAnimation.js";
import type { IHslAnimation } from "../Interfaces/IHslAnimation.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
export declare class HslAnimation implements IHslAnimation, IOptionLoader<IHslAnimation> {
    h: ColorAnimation;
    l: ColorAnimation;
    s: ColorAnimation;
    constructor();
    load(data?: RecursivePartial<IHslAnimation>): void;
}
