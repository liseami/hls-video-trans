"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const ClickEvent_js_1 = require("./ClickEvent.js");
const DivEvent_js_1 = require("./DivEvent.js");
const HoverEvent_js_1 = require("./HoverEvent.js");
const ResizeEvent_js_1 = require("./ResizeEvent.js");
const Utils_js_1 = require("../../../../Utils/Utils.js");
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
class Events {
    constructor() {
        this.onClick = new ClickEvent_js_1.ClickEvent();
        this.onDiv = new DivEvent_js_1.DivEvent();
        this.onHover = new HoverEvent_js_1.HoverEvent();
        this.resize = new ResizeEvent_js_1.ResizeEvent();
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        this.onClick.load(data.onClick);
        const onDiv = data.onDiv;
        if (onDiv !== undefined) {
            this.onDiv = (0, Utils_js_1.executeOnSingleOrMultiple)(onDiv, t => {
                const tmp = new DivEvent_js_1.DivEvent();
                tmp.load(t);
                return tmp;
            });
        }
        this.onHover.load(data.onHover);
        this.resize.load(data.resize);
    }
}
exports.Events = Events;
