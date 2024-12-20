(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ThemeDefault", "../../../Utils/Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Theme = void 0;
    const ThemeDefault_1 = require("./ThemeDefault");
    const Utils_1 = require("../../../Utils/Utils");
    class Theme {
        constructor() {
            this.name = "";
            this.default = new ThemeDefault_1.ThemeDefault();
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.name !== undefined) {
                this.name = data.name;
            }
            this.default.load(data.default);
            if (data.options !== undefined) {
                this.options = (0, Utils_1.deepExtend)({}, data.options);
            }
        }
    }
    exports.Theme = Theme;
});
