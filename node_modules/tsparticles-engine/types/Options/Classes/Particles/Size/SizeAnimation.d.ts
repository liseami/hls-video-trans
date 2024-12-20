import { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ISizeAnimation } from "../../../Interfaces/Particles/Size/ISizeAnimation";
import { RangedAnimationOptions } from "../../AnimationOptions";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class SizeAnimation extends RangedAnimationOptions implements ISizeAnimation, IOptionLoader<ISizeAnimation> {
    destroy: DestroyType | keyof typeof DestroyType;
    constructor();
    get size_min(): number | undefined;
    set size_min(value: number | undefined);
    load(data?: RecursivePartial<ISizeAnimation>): void;
}
