(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ThemeDefault = void 0;
    class ThemeDefault {
        constructor() {
            this.auto = false;
            this.mode = "any";
            this.value = false;
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.auto !== undefined) {
                this.auto = data.auto;
            }
            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
            if (data.value !== undefined) {
                this.value = data.value;
            }
        }
    }
    exports.ThemeDefault = ThemeDefault;
});
