import type { IHoverEvent } from "../../../Interfaces/Interactivity/Events/IHoverEvent.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import { Parallax } from "./Parallax.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
export declare class HoverEvent implements IHoverEvent, IOptionLoader<IHoverEvent> {
    enable: boolean;
    mode: SingleOrMultiple<string>;
    readonly parallax: Parallax;
    constructor();
    load(data?: RecursivePartial<IHoverEvent>): void;
}
