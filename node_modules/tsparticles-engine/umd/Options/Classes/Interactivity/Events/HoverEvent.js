(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Parallax"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HoverEvent = void 0;
    const Parallax_1 = require("./Parallax");
    class HoverEvent {
        constructor() {
            this.enable = false;
            this.mode = [];
            this.parallax = new Parallax_1.Parallax();
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
            this.parallax.load(data.parallax);
        }
    }
    exports.HoverEvent = HoverEvent;
});
