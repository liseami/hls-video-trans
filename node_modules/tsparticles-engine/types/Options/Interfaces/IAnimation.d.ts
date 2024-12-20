import type { AnimationMode } from "../../Enums/Modes/AnimationMode";
import type { RangeValue } from "../../Types/RangeValue";
import type { StartValueType } from "../../Enums/Types/StartValueType";
export interface IAnimation {
    count: RangeValue;
    decay: RangeValue;
    delay: RangeValue;
    enable: boolean;
    speed: RangeValue;
    sync: boolean;
}
export interface IRangedAnimation extends IAnimation {
    minimumValue?: number;
    mode: AnimationMode | keyof typeof AnimationMode;
    startValue: StartValueType | keyof typeof StartValueType;
}
