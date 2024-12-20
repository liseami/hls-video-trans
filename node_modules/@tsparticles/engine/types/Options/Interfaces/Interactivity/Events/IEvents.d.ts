import type { IClickEvent } from "./IClickEvent.js";
import type { IDivEvent } from "./IDivEvent.js";
import type { IHoverEvent } from "./IHoverEvent.js";
import type { IResizeEvent } from "./IResizeEvent.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
export interface IEvents {
    onClick: IClickEvent;
    onDiv: SingleOrMultiple<IDivEvent>;
    onHover: IHoverEvent;
    resize: IResizeEvent;
}
