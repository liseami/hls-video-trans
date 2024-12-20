import type { IClickEvent } from "../../../Interfaces/Interactivity/Events/IClickEvent.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
export declare class ClickEvent implements IClickEvent, IOptionLoader<IClickEvent> {
    enable: boolean;
    mode: SingleOrMultiple<string>;
    constructor();
    load(data?: RecursivePartial<IClickEvent>): void;
}
