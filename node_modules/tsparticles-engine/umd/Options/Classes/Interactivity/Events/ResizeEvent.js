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
    exports.ResizeEvent = void 0;
    class ResizeEvent {
        constructor() {
            this.delay = 0.5;
            this.enable = true;
        }
        load(data) {
            if (data === undefined) {
                return;
            }
            if (data.delay !== undefined) {
                this.delay = data.delay;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
        }
    }
    exports.ResizeEvent = ResizeEvent;
});
