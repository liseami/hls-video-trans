(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../Enums/Modes/PixelMode.js", "../../../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MoveCenter = void 0;
    const PixelMode_js_1 = require("../../../../Enums/Modes/PixelMode.js");
    const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
    class MoveCenter {
        constructor() {
            this.x = 50;
            this.y = 50;
            this.mode = PixelMode_js_1.PixelMode.percent;
            this.radius = 0;
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            if (data.x !== undefined) {
                this.x = data.x;
            }
            if (data.y !== undefined) {
                this.y = data.y;
            }
            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
            if (data.radius !== undefined) {
                this.radius = data.radius;
            }
        }
    }
    exports.MoveCenter = MoveCenter;
});
