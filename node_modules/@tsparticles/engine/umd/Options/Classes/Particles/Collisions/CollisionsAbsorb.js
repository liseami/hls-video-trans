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
    exports.CollisionsAbsorb = void 0;
    const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
    class CollisionsAbsorb {
        constructor() {
            this.speed = 2;
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            if (data.speed !== undefined) {
                this.speed = data.speed;
            }
        }
    }
    exports.CollisionsAbsorb = CollisionsAbsorb;
});
