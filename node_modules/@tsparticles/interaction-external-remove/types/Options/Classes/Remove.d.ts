import { type IOptionLoader, type RangeValue, type RecursivePartial } from "@tsparticles/engine";
import type { IRemove } from "../Interfaces/IRemove.js";
export declare class Remove implements IRemove, IOptionLoader<IRemove> {
    quantity: RangeValue;
    constructor();
    load(data?: RecursivePartial<IRemove>): void;
}
