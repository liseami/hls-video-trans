import { type IOptionLoader, type RecursivePartial, type SingleOrMultiple } from "@tsparticles/engine";
import { BubbleBase } from "./BubbleBase.js";
import { BubbleDiv } from "./BubbleDiv.js";
import type { IBubble } from "../Interfaces/IBubble.js";
export declare class Bubble extends BubbleBase implements IBubble, IOptionLoader<IBubble> {
    divs?: SingleOrMultiple<BubbleDiv>;
    load(data?: RecursivePartial<IBubble>): void;
}
