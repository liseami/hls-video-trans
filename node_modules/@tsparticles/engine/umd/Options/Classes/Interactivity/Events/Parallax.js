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
    exports.Parallax = void 0;
    const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
    class Parallax {
        constructor() {
            this.enable = false;
            this.force = 2;
            this.smooth = 10;
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.force !== undefined) {
                this.force = data.force;
            }
            if (data.smooth !== undefined) {
                this.smooth = data.smooth;
            }
        }
    }
    exports.Parallax = Parallax;
});
