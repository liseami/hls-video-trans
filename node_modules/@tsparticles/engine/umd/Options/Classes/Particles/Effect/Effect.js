(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../Utils/Utils.js", "../../../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Effect = void 0;
    const Utils_js_1 = require("../../../../Utils/Utils.js");
    const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
    class Effect {
        constructor() {
            this.close = true;
            this.fill = true;
            this.options = {};
            this.type = [];
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            const options = data.options;
            if (options !== undefined) {
                for (const effect in options) {
                    const item = options[effect];
                    if (item) {
                        this.options[effect] = (0, Utils_js_1.deepExtend)(this.options[effect] ?? {}, item);
                    }
                }
            }
            if (data.close !== undefined) {
                this.close = data.close;
            }
            if (data.fill !== undefined) {
                this.fill = data.fill;
            }
            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
    exports.Effect = Effect;
});
