import { executeOnSingleOrMultiple, isBoolean } from "../../../../Utils/Utils";
import { ClickEvent } from "./ClickEvent";
import { DivEvent } from "./DivEvent";
import { HoverEvent } from "./HoverEvent";
import { ResizeEvent } from "./ResizeEvent";
export class Events {
    constructor() {
        this.onClick = new ClickEvent();
        this.onDiv = new DivEvent();
        this.onHover = new HoverEvent();
        this.resize = new ResizeEvent();
    }
    get onclick() {
        return this.onClick;
    }
    set onclick(value) {
        this.onClick = value;
    }
    get ondiv() {
        return this.onDiv;
    }
    set ondiv(value) {
        this.onDiv = value;
    }
    get onhover() {
        return this.onHover;
    }
    set onhover(value) {
        this.onHover = value;
    }
    load(data) {
        if (!data) {
            return;
        }
        this.onClick.load(data.onClick ?? data.onclick);
        const onDiv = data.onDiv ?? data.ondiv;
        if (onDiv !== undefined) {
            this.onDiv = executeOnSingleOrMultiple(onDiv, (t) => {
                const tmp = new DivEvent();
                tmp.load(t);
                return tmp;
            });
        }
        this.onHover.load(data.onHover ?? data.onhover);
        if (isBoolean(data.resize)) {
            this.resize.enable = data.resize;
        }
        else {
            this.resize.load(data.resize);
        }
    }
}
