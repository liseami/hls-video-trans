import { ClickEvent } from "./ClickEvent.js";
import { DivEvent } from "./DivEvent.js";
import { HoverEvent } from "./HoverEvent.js";
import type { IEvents } from "../../../Interfaces/Interactivity/Events/IEvents.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { ResizeEvent } from "./ResizeEvent.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
export declare class Events implements IEvents, IOptionLoader<IEvents> {
    readonly onClick: ClickEvent;
    onDiv: SingleOrMultiple<DivEvent>;
    readonly onHover: HoverEvent;
    readonly resize: ResizeEvent;
    constructor();
    load(data?: RecursivePartial<IEvents>): void;
}
