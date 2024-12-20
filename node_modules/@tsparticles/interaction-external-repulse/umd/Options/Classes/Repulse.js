(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./RepulseBase.js", "./RepulseDiv.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Repulse = void 0;
    const engine_1 = require("@tsparticles/engine");
    const RepulseBase_js_1 = require("./RepulseBase.js");
    const RepulseDiv_js_1 = require("./RepulseDiv.js");
    class Repulse extends RepulseBase_js_1.RepulseBase {
        load(data) {
            super.load(data);
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            this.divs = (0, engine_1.executeOnSingleOrMultiple)(data.divs, div => {
                const tmp = new RepulseDiv_js_1.RepulseDiv();
                tmp.load(div);
                return tmp;
            });
        }
    }
    exports.Repulse = Repulse;
});
