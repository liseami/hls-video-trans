import type { ClickMode } from "../../../../Enums/Modes/ClickMode";
import type { IClickEvent } from "../../../Interfaces/Interactivity/Events/IClickEvent";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export declare class ClickEvent implements IClickEvent, IOptionLoader<IClickEvent> {
    enable: boolean;
    mode: SingleOrMultiple<ClickMode | keyof typeof ClickMode | string>;
    constructor();
    load(data?: RecursivePartial<IClickEvent>): void;
}
