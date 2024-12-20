import { type IOptionLoader, type RangeValue, type RecursivePartial } from "@tsparticles/engine";
import type { IEmitterRate } from "../Interfaces/IEmitterRate.js";
export declare class EmitterRate implements IEmitterRate, IOptionLoader<IEmitterRate> {
    delay: RangeValue;
    quantity: RangeValue;
    constructor();
    load(data?: RecursivePartial<IEmitterRate>): void;
}
