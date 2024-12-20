import type { IAnimation, IRangedAnimation } from "../Interfaces/IAnimation";
import { AnimationMode } from "../../Enums/Modes/AnimationMode";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { RangeValue } from "../../Types/RangeValue";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { StartValueType } from "../../Enums/Types/StartValueType";
export declare class AnimationOptions implements IAnimation, IOptionLoader<IAnimation> {
    count: RangeValue;
    decay: RangeValue;
    delay: RangeValue;
    enable: boolean;
    speed: RangeValue;
    sync: boolean;
    constructor();
    load(data?: RecursivePartial<IAnimation>): void;
}
export declare class RangedAnimationOptions extends AnimationOptions implements IOptionLoader<IRangedAnimation> {
    minimumValue?: number;
    mode: AnimationMode | keyof typeof AnimationMode;
    startValue: StartValueType | keyof typeof StartValueType;
    constructor();
    load(data?: RecursivePartial<IRangedAnimation>): void;
}
