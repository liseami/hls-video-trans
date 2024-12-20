(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./AbsorberSizeLimit.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbsorberSize = void 0;
    const engine_1 = require("@tsparticles/engine");
    const AbsorberSizeLimit_js_1 = require("./AbsorberSizeLimit.js");
    class AbsorberSize extends engine_1.ValueWithRandom {
        constructor() {
            super();
            this.density = 5;
            this.value = 50;
            this.limit = new AbsorberSizeLimit_js_1.AbsorberSizeLimit();
        }
        load(data) {
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            super.load(data);
            if (data.density !== undefined) {
                this.density = data.density;
            }
            if ((0, engine_1.isNumber)(data.limit)) {
                this.limit.radius = data.limit;
            }
            else {
                this.limit.load(data.limit);
            }
        }
    }
    exports.AbsorberSize = AbsorberSize;
});
