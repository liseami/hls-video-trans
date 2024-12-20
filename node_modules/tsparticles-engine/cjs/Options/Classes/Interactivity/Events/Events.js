"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const Utils_1 = require("../../../../Utils/Utils");
const ClickEvent_1 = require("./ClickEvent");
const DivEvent_1 = require("./DivEvent");
const HoverEvent_1 = require("./HoverEvent");
const ResizeEvent_1 = require("./ResizeEvent");
class Events {
    constructor() {
        this.onClick = new ClickEvent_1.ClickEvent();
        this.onDiv = new DivEvent_1.DivEvent();
        this.onHover = new HoverEvent_1.HoverEvent();
        this.resize = new ResizeEvent_1.ResizeEvent();
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
            this.onDiv = (0, Utils_1.executeOnSingleOrMultiple)(onDiv, (t) => {
                const tmp = new DivEvent_1.DivEvent();
                tmp.load(t);
                return tmp;
            });
        }
        this.onHover.load(data.onHover ?? data.onhover);
        if ((0, Utils_1.isBoolean)(data.resize)) {
            this.resize.enable = data.resize;
        }
        else {
            this.resize.load(data.resize);
        }
    }
}
exports.Events = Events;
