import type { IOpacity } from "../../../Interfaces/Particles/Opacity/IOpacity.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import { OpacityAnimation } from "./OpacityAnimation.js";
import { RangedAnimationValueWithRandom } from "../../ValueWithRandom.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class Opacity extends RangedAnimationValueWithRandom implements IOpacity, IOptionLoader<IOpacity> {
    readonly animation: OpacityAnimation;
    constructor();
    load(data?: RecursivePartial<IOpacity>): void;
}
