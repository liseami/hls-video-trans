import { type IOptionLoader, type RangeValue, type RecursivePartial } from "@tsparticles/engine";
import type { IRotateAnimation } from "../Interfaces/IRotateAnimation.js";
export declare class RotateAnimation implements IRotateAnimation, IOptionLoader<IRotateAnimation> {
    decay: RangeValue;
    enable: boolean;
    speed: RangeValue;
    sync: boolean;
    constructor();
    load(data?: RecursivePartial<IRotateAnimation>): void;
}
