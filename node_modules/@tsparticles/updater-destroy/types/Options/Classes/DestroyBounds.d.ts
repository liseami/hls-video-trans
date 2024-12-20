import { type IOptionLoader, type RangeValue, type RecursivePartial } from "@tsparticles/engine";
import type { IDestroyBounds } from "../Interfaces/IDestroyBounds.js";
export declare class DestroyBounds implements IDestroyBounds, IOptionLoader<IDestroyBounds> {
    bottom?: RangeValue;
    left?: RangeValue;
    right?: RangeValue;
    top?: RangeValue;
    load(data?: RecursivePartial<IDestroyBounds>): void;
}
