import { type IOptionLoader, type RangeValue, type RecursivePartial } from "@tsparticles/engine";
import type { IEmitterLife } from "../Interfaces/IEmitterLife.js";
export declare class EmitterLife implements IEmitterLife, IOptionLoader<IEmitterLife> {
    count?: number;
    delay?: RangeValue;
    duration?: RangeValue;
    wait: boolean;
    constructor();
    load(data?: RecursivePartial<IEmitterLife>): void;
}
