import { type IOptionLoader, type RangeValue, type RecursivePartial } from "@tsparticles/engine";
import type { IPush } from "../Interfaces/IPush.js";
export declare class Push implements IPush, IOptionLoader<IPush> {
    default: boolean;
    groups: string[];
    quantity: RangeValue;
    constructor();
    load(data?: RecursivePartial<IPush>): void;
}
