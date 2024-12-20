import { type IOptionLoader, type RecursivePartial, ValueWithRandom } from "@tsparticles/engine";
import type { ILifeDuration } from "../Interfaces/ILifeDuration.js";
export declare class LifeDuration extends ValueWithRandom implements ILifeDuration, IOptionLoader<ILifeDuration> {
    sync: boolean;
    constructor();
    load(data?: RecursivePartial<ILifeDuration>): void;
}
