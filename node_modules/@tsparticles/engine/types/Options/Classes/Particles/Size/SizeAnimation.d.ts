import { DestroyType } from "../../../../Enums/Types/DestroyType.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { ISizeAnimation } from "../../../Interfaces/Particles/Size/ISizeAnimation.js";
import { RangedAnimationOptions } from "../../AnimationOptions.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class SizeAnimation extends RangedAnimationOptions implements ISizeAnimation, IOptionLoader<ISizeAnimation> {
    destroy: DestroyType | keyof typeof DestroyType;
    constructor();
    load(data?: RecursivePartial<ISizeAnimation>): void;
}
