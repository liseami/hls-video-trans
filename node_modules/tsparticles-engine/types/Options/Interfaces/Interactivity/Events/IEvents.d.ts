import type { IClickEvent } from "./IClickEvent";
import type { IDivEvent } from "./IDivEvent";
import type { IHoverEvent } from "./IHoverEvent";
import type { IResizeEvent } from "./IResizeEvent";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export interface IEvents {
    onClick: IClickEvent;
    onDiv: SingleOrMultiple<IDivEvent>;
    onHover: IHoverEvent;
    onclick: IClickEvent;
    ondiv: SingleOrMultiple<IDivEvent>;
    onhover: IHoverEvent;
    resize: boolean | IResizeEvent;
}
