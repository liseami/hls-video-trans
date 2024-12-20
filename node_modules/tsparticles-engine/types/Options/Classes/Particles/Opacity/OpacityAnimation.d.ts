import { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IOpacityAnimation } from "../../../Interfaces/Particles/Opacity/IOpacityAnimation";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { RangedAnimationOptions } from "../../AnimationOptions";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class OpacityAnimation extends RangedAnimationOptions implements IOpacityAnimation, IOptionLoader<IOpacityAnimation> {
    destroy: DestroyType | keyof typeof DestroyType;
    constructor();
    get opacity_min(): number | undefined;
    set opacity_min(value: number | undefined);
    load(data?: RecursivePartial<IOpacityAnimation>): void;
}
