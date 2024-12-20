(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../Enums/Modes/OutMode.js", "../../../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OutModes = void 0;
    const OutMode_js_1 = require("../../../../Enums/Modes/OutMode.js");
    const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
    class OutModes {
        constructor() {
            this.default = OutMode_js_1.OutMode.out;
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            if (data.default !== undefined) {
                this.default = data.default;
            }
            this.bottom = data.bottom ?? data.default;
            this.left = data.left ?? data.default;
            this.right = data.right ?? data.default;
            this.top = data.top ?? data.default;
        }
    }
    exports.OutModes = OutModes;
});
