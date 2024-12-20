import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { ISize } from "../../../Interfaces/Particles/Size/ISize.js";
import { RangedAnimationValueWithRandom } from "../../ValueWithRandom.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { SizeAnimation } from "./SizeAnimation.js";
export declare class Size extends RangedAnimationValueWithRandom implements ISize, IOptionLoader<ISize> {
    readonly animation: SizeAnimation;
    constructor();
    load(data?: RecursivePartial<ISize>): void;
}
