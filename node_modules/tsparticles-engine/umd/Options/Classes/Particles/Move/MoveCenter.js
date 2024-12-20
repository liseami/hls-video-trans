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
    exports.MoveCenter = void 0;
    class MoveCenter {
        constructor() {
            this.x = 50;
            this.y = 50;
            this.mode = "percent";
            this.radius = 0;
        }
        load(data) {
            if (!data) {
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
