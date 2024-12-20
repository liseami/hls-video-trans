import { type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import type { ILife } from "../Interfaces/ILife.js";
import { LifeDelay } from "./LifeDelay.js";
import { LifeDuration } from "./LifeDuration.js";
export declare class Life implements ILife, IOptionLoader<ILife> {
    count: number;
    delay: LifeDelay;
    duration: LifeDuration;
    constructor();
    load(data?: RecursivePartial<ILife>): void;
}
