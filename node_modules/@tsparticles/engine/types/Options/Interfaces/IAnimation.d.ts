import type { AnimationMode } from "../../Enums/Modes/AnimationMode.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { StartValueType } from "../../Enums/Types/StartValueType.js";
export interface IAnimation {
    count: RangeValue;
    decay: RangeValue;
    delay: RangeValue;
    enable: boolean;
    speed: RangeValue;
    sync: boolean;
}
export interface IRangedAnimation extends IAnimation {
    mode: AnimationMode | keyof typeof AnimationMode;
    startValue: StartValueType | keyof typeof StartValueType;
}
