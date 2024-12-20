(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Utils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineDrawer = void 0;
    const Utils_js_1 = require("./Utils.js");
    const sides = 1;
    class LineDrawer {
        constructor() {
            this.validTypes = ["line"];
        }
        draw(data) {
            (0, Utils_js_1.drawLine)(data);
        }
        getSidesCount() {
            return sides;
        }
    }
    exports.LineDrawer = LineDrawer;
});
