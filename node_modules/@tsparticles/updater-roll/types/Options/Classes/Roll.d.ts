import { type IOptionLoader, OptionsColor, type RangeValue, type RecursivePartial } from "@tsparticles/engine";
import type { IRoll } from "../Interfaces/IRoll.js";
import { RollLight } from "./RollLight.js";
import { RollMode } from "../../RollMode.js";
export declare class Roll implements IRoll, IOptionLoader<IRoll> {
    backColor?: OptionsColor;
    darken: RollLight;
    enable: boolean;
    enlighten: RollLight;
    mode: RollMode | keyof typeof RollMode;
    speed: RangeValue;
    constructor();
    load(data?: RecursivePartial<IRoll>): void;
}
