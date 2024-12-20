(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EmitterShapeReplace = void 0;
    const engine_1 = require("@tsparticles/engine");
    class EmitterShapeReplace {
        constructor() {
            this.color = false;
            this.opacity = false;
        }
        load(data) {
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            if (data.color !== undefined) {
                this.color = data.color;
            }
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
        }
    }
    exports.EmitterShapeReplace = EmitterShapeReplace;
});
