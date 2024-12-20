import { type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import type { ISlow } from "../Interfaces/ISlow.js";
export declare class Slow implements ISlow, IOptionLoader<ISlow> {
    factor: number;
    radius: number;
    constructor();
    load(data?: RecursivePartial<ISlow>): void;
}
