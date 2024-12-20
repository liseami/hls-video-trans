import { ColorAnimation } from "./ColorAnimation";
import type { IHslAnimation } from "../Interfaces/IHslAnimation";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../Types/RecursivePartial";
export declare class HslAnimation implements IHslAnimation, IOptionLoader<IHslAnimation> {
    h: ColorAnimation;
    l: ColorAnimation;
    s: ColorAnimation;
    constructor();
    load(data?: RecursivePartial<IHslAnimation>): void;
}
