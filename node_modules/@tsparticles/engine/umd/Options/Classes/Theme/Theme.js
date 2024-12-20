(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ThemeDefault.js", "../../../Utils/Utils.js", "../../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Theme = void 0;
    const ThemeDefault_js_1 = require("./ThemeDefault.js");
    const Utils_js_1 = require("../../../Utils/Utils.js");
    const TypeUtils_js_1 = require("../../../Utils/TypeUtils.js");
    class Theme {
        constructor() {
            this.name = "";
            this.default = new ThemeDefault_js_1.ThemeDefault();
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            if (data.name !== undefined) {
                this.name = data.name;
            }
            this.default.load(data.default);
            if (data.options !== undefined) {
                this.options = (0, Utils_js_1.deepExtend)({}, data.options);
            }
        }
    }
    exports.Theme = Theme;
});
