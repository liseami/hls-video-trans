import { type IOptionLoader, OptionsColor, type RecursivePartial, type SingleOrMultiple } from "@tsparticles/engine";
import type { IBubbleBase } from "../Interfaces/IBubbleBase.js";
export declare abstract class BubbleBase implements IBubbleBase, IOptionLoader<IBubbleBase> {
    color?: SingleOrMultiple<OptionsColor>;
    distance: number;
    duration: number;
    mix: boolean;
    opacity?: number;
    size?: number;
    constructor();
    load(data?: RecursivePartial<IBubbleBase>): void;
}
