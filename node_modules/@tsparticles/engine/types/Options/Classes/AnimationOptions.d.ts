import type { IAnimation, IRangedAnimation } from "../Interfaces/IAnimation.js";
import { AnimationMode } from "../../Enums/Modes/AnimationMode.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { StartValueType } from "../../Enums/Types/StartValueType.js";
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
    mode: AnimationMode | keyof typeof AnimationMode;
    startValue: StartValueType | keyof typeof StartValueType;
    constructor();
    load(data?: RecursivePartial<IRangedAnimation>): void;
}
