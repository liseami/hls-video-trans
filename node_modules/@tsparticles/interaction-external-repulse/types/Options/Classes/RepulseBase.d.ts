import { EasingType, type EasingTypeAlt, type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import type { IRepulseBase } from "../Interfaces/IRepulseBase.js";
export declare abstract class RepulseBase implements IRepulseBase, IOptionLoader<IRepulseBase> {
    distance: number;
    duration: number;
    easing: EasingType | EasingTypeAlt;
    factor: number;
    maxSpeed: number;
    speed: number;
    constructor();
    load(data?: RecursivePartial<IRepulseBase>): void;
}
