import { type IOptionLoader, OptionsColor, type RecursivePartial } from "@tsparticles/engine";
import type { IGrabLinks } from "../Interfaces/IGrabLinks.js";
export declare class GrabLinks implements IGrabLinks, IOptionLoader<IGrabLinks> {
    blink: boolean;
    color?: OptionsColor;
    consent: boolean;
    opacity: number;
    constructor();
    load(data?: RecursivePartial<IGrabLinks>): void;
}
