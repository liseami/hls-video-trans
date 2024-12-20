import { ClickEvent } from "./ClickEvent.js";
import { DivEvent } from "./DivEvent.js";
import { HoverEvent } from "./HoverEvent.js";
import { ResizeEvent } from "./ResizeEvent.js";
import { executeOnSingleOrMultiple } from "../../../../Utils/Utils.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
export class Events {
    constructor() {
        this.onClick = new ClickEvent();
        this.onDiv = new DivEvent();
        this.onHover = new HoverEvent();
        this.resize = new ResizeEvent();
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        this.onClick.load(data.onClick);
        const onDiv = data.onDiv;
        if (onDiv !== undefined) {
            this.onDiv = executeOnSingleOrMultiple(onDiv, t => {
                const tmp = new DivEvent();
                tmp.load(t);
                return tmp;
            });
        }
        this.onHover.load(data.onHover);
        this.resize.load(data.resize);
    }
}
