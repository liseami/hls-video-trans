(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./RepulseBase.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RepulseDiv = void 0;
    const engine_1 = require("@tsparticles/engine");
    const RepulseBase_js_1 = require("./RepulseBase.js");
    class RepulseDiv extends RepulseBase_js_1.RepulseBase {
        constructor() {
            super();
            this.selectors = [];
        }
        load(data) {
            super.load(data);
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            if (data.selectors !== undefined) {
                this.selectors = data.selectors;
            }
        }
    }
    exports.RepulseDiv = RepulseDiv;
});
