import type { IColorAnimation } from "../Interfaces/IColorAnimation";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { RangeValue } from "../../Types/RangeValue";
import type { RecursivePartial } from "../../Types/RecursivePartial";
export declare class ColorAnimation implements IColorAnimation, IOptionLoader<IColorAnimation> {
    count: RangeValue;
    decay: RangeValue;
    delay: RangeValue;
    enable: boolean;
    offset: RangeValue;
    speed: RangeValue;
    sync: boolean;
    constructor();
    load(data?: RecursivePartial<IColorAnimation>): void;
}
