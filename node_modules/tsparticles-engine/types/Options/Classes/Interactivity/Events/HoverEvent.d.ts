import type { HoverMode } from "../../../../Enums/Modes/HoverMode";
import type { IHoverEvent } from "../../../Interfaces/Interactivity/Events/IHoverEvent";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { Parallax } from "./Parallax";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export declare class HoverEvent implements IHoverEvent, IOptionLoader<IHoverEvent> {
    enable: boolean;
    mode: SingleOrMultiple<HoverMode | keyof typeof HoverMode | string>;
    parallax: Parallax;
    constructor();
    load(data?: RecursivePartial<IHoverEvent>): void;
}
