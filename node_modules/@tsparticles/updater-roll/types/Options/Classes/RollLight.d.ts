import { type IOptionLoader, type RangeValue, type RecursivePartial } from "@tsparticles/engine";
import type { IRollLight } from "../Interfaces/IRollLight.js";
export declare class RollLight implements IRollLight, IOptionLoader<IRollLight> {
    enable: boolean;
    value: RangeValue;
    constructor();
    load(data?: RecursivePartial<IRollLight>): void;
}
