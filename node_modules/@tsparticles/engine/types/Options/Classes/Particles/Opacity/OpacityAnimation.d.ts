import { DestroyType } from "../../../../Enums/Types/DestroyType.js";
import type { IOpacityAnimation } from "../../../Interfaces/Particles/Opacity/IOpacityAnimation.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import { RangedAnimationOptions } from "../../AnimationOptions.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class OpacityAnimation extends RangedAnimationOptions implements IOpacityAnimation, IOptionLoader<IOpacityAnimation> {
    destroy: DestroyType | keyof typeof DestroyType;
    constructor();
    load(data?: RecursivePartial<IOpacityAnimation>): void;
}
