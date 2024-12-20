import { type IOptionLoader, type RangeValue, type RecursivePartial } from "@tsparticles/engine";
import type { ITiltAnimation } from "../Interfaces/ITiltAnimation.js";
export declare class TiltAnimation implements ITiltAnimation, IOptionLoader<ITiltAnimation> {
    decay: RangeValue;
    enable: boolean;
    speed: RangeValue;
    sync: boolean;
    constructor();
    load(data?: RecursivePartial<ITiltAnimation>): void;
}
