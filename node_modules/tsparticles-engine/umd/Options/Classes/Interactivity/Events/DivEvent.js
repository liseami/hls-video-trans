(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../Utils/Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DivEvent = void 0;
    const Utils_1 = require("../../../../Utils/Utils");
    class DivEvent {
        constructor() {
            this.selectors = [];
            this.enable = false;
            this.mode = [];
            this.type = "circle";
        }
        get el() {
            return this.elementId;
        }
        set el(value) {
            this.elementId = value;
        }
        get elementId() {
            return this.ids;
        }
        set elementId(value) {
            this.ids = value;
        }
        get ids() {
            return (0, Utils_1.executeOnSingleOrMultiple)(this.selectors, (t) => t.replace("#", ""));
        }
        set ids(value) {
            this.selectors = (0, Utils_1.executeOnSingleOrMultiple)(value, (t) => `#${t}`);
        }
        load(data) {
            if (!data) {
                return;
            }
            const ids = data.ids ?? data.elementId ?? data.el;
            if (ids !== undefined) {
                this.ids = ids;
            }
            if (data.selectors !== undefined) {
                this.selectors = data.selectors;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
    exports.DivEvent = DivEvent;
});
