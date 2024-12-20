import { type IOptionLoader, type RecursivePartial, ValueWithRandom } from "@tsparticles/engine";
import type { ILifeDelay } from "../Interfaces/ILifeDelay.js";
export declare class LifeDelay extends ValueWithRandom implements ILifeDelay, IOptionLoader<ILifeDelay> {
    sync: boolean;
    constructor();
    load(data?: RecursivePartial<ILifeDelay>): void;
}
