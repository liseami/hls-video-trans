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
    exports.EmitterShapeBase = void 0;
    class EmitterShapeBase {
        constructor(position, size, fill, options) {
            this.position = position;
            this.size = size;
            this.fill = fill;
            this.options = options;
        }
        resize(position, size) {
            this.position = position;
            this.size = size;
        }
    }
    exports.EmitterShapeBase = EmitterShapeBase;
});
