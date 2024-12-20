import { type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import type { IBounce } from "../Interfaces/IBounce.js";
export declare class Bounce implements IBounce, IOptionLoader<IBounce> {
    distance: number;
    constructor();
    load(data?: RecursivePartial<IBounce>): void;
}
