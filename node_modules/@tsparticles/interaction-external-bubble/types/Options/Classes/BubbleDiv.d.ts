import { type IOptionLoader, type RecursivePartial, type SingleOrMultiple } from "@tsparticles/engine";
import { BubbleBase } from "./BubbleBase.js";
import type { IBubbleDiv } from "../Interfaces/IBubbleDiv.js";
export declare class BubbleDiv extends BubbleBase implements IBubbleDiv, IOptionLoader<IBubbleDiv> {
    selectors: SingleOrMultiple<string>;
    constructor();
    load(data?: RecursivePartial<IBubbleDiv>): void;
}
