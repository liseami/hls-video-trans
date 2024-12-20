(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ResizeEvent = void 0;
    const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
    class ResizeEvent {
        constructor() {
            this.delay = 0.5;
            this.enable = true;
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            if (data.delay !== undefined) {
                this.delay = data.delay;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
        }
    }
    exports.ResizeEvent = ResizeEvent;
});
