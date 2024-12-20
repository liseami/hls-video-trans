(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../Enums/Types/DivType.js", "../../../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DivEvent = void 0;
    const DivType_js_1 = require("../../../../Enums/Types/DivType.js");
    const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
    class DivEvent {
        constructor() {
            this.selectors = [];
            this.enable = false;
            this.mode = [];
            this.type = DivType_js_1.DivType.circle;
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
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
