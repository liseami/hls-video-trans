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
    exports.Slow = void 0;
    const engine_1 = require("@tsparticles/engine");
    class Slow {
        constructor() {
            this.factor = 3;
            this.radius = 200;
        }
        load(data) {
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            if (data.factor !== undefined) {
                this.factor = data.factor;
            }
            if (data.radius !== undefined) {
                this.radius = data.radius;
            }
        }
    }
    exports.Slow = Slow;
});
