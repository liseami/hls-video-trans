import { type IOptionLoader, type RecursivePartial, type SingleOrMultiple } from "@tsparticles/engine";
import type { IRepulse } from "../Interfaces/IRepulse.js";
import { RepulseBase } from "./RepulseBase.js";
import { RepulseDiv } from "./RepulseDiv.js";
export declare class Repulse extends RepulseBase implements IRepulse, IOptionLoader<IRepulse> {
    divs?: SingleOrMultiple<RepulseDiv>;
    load(data?: RecursivePartial<IRepulse>): void;
}
