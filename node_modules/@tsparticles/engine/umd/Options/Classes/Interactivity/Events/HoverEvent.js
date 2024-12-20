(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Parallax.js", "../../../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HoverEvent = void 0;
    const Parallax_js_1 = require("./Parallax.js");
    const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
    class HoverEvent {
        constructor() {
            this.enable = false;
            this.mode = [];
            this.parallax = new Parallax_js_1.Parallax();
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
            this.parallax.load(data.parallax);
        }
    }
    exports.HoverEvent = HoverEvent;
});
