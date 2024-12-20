import { EasingType, type EasingTypeAlt, type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import type { IAttract } from "../Interfaces/IAttract.js";
export declare class Attract implements IAttract, IOptionLoader<IAttract> {
    distance: number;
    duration: number;
    easing: EasingType | EasingTypeAlt;
    factor: number;
    maxSpeed: number;
    speed: number;
    constructor();
    load(data?: RecursivePartial<IAttract>): void;
}
