import { HslAnimation } from "./HslAnimation.js";
import type { IAnimatableColor } from "../Interfaces/IAnimatableColor.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import { OptionsColor } from "./OptionsColor.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";
export declare class AnimatableColor extends OptionsColor implements IAnimatableColor, IOptionLoader<IAnimatableColor> {
    animation: HslAnimation;
    constructor();
    static create(source?: AnimatableColor, data?: SingleOrMultiple<string> | RecursivePartial<IAnimatableColor>): AnimatableColor;
    load(data?: RecursivePartial<IAnimatableColor>): void;
}
