import { type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import type { ITwinkle } from "../Interfaces/ITwinkle.js";
import { TwinkleValues } from "./TwinkleValues.js";
export declare class Twinkle implements ITwinkle, IOptionLoader<ITwinkle> {
    lines: TwinkleValues;
    particles: TwinkleValues;
    constructor();
    load(data?: RecursivePartial<ITwinkle>): void;
}
