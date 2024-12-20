import { AnimatableColor } from "../AnimatableColor";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { IStroke } from "../../Interfaces/Particles/IStroke";
import type { RangeValue } from "../../../Types/RangeValue";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Stroke implements IStroke, IOptionLoader<IStroke> {
    color?: AnimatableColor;
    opacity?: RangeValue;
    width: RangeValue;
    constructor();
    load(data?: RecursivePartial<IStroke>): void;
}
