import { type IOptionLoader, type RecursivePartial, type SingleOrMultiple } from "@tsparticles/engine";
import type { IRepulseDiv } from "../Interfaces/IRepulseDiv.js";
import { RepulseBase } from "./RepulseBase.js";
export declare class RepulseDiv extends RepulseBase implements IRepulseDiv, IOptionLoader<IRepulseDiv> {
    selectors: SingleOrMultiple<string>;
    constructor();
    load(data?: RecursivePartial<IRepulseDiv>): void;
}
