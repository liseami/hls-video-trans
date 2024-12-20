import { AnimatableColor } from "../AnimatableColor.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { IStroke } from "../../Interfaces/Particles/IStroke.js";
import type { RangeValue } from "../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
export declare class Stroke implements IStroke, IOptionLoader<IStroke> {
    color?: AnimatableColor;
    opacity?: RangeValue;
    width: RangeValue;
    constructor();
    load(data?: RecursivePartial<IStroke>): void;
}
