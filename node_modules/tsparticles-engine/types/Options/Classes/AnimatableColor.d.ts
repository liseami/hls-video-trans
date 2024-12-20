import { HslAnimation } from "./HslAnimation";
import type { IAnimatableColor } from "../Interfaces/IAnimatableColor";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import { OptionsColor } from "./OptionsColor";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";
export declare class AnimatableColor extends OptionsColor implements IAnimatableColor, IOptionLoader<IAnimatableColor> {
    animation: HslAnimation;
    constructor();
    static create(source?: AnimatableColor, data?: SingleOrMultiple<string> | RecursivePartial<IAnimatableColor>): AnimatableColor;
    load(data?: RecursivePartial<IAnimatableColor>): void;
}
