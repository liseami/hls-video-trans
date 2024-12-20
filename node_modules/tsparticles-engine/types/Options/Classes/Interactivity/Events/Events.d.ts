import { ClickEvent } from "./ClickEvent";
import { DivEvent } from "./DivEvent";
import { HoverEvent } from "./HoverEvent";
import type { IEvents } from "../../../Interfaces/Interactivity/Events/IEvents";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { ResizeEvent } from "./ResizeEvent";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export declare class Events implements IEvents, IOptionLoader<IEvents> {
    onClick: ClickEvent;
    onDiv: SingleOrMultiple<DivEvent>;
    onHover: HoverEvent;
    resize: ResizeEvent;
    constructor();
    get onclick(): ClickEvent;
    set onclick(value: ClickEvent);
    get ondiv(): SingleOrMultiple<DivEvent>;
    set ondiv(value: SingleOrMultiple<DivEvent>);
    get onhover(): HoverEvent;
    set onhover(value: HoverEvent);
    load(data?: RecursivePartial<IEvents>): void;
}
