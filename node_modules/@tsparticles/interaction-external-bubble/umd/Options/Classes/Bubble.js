(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./BubbleBase.js", "./BubbleDiv.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Bubble = void 0;
    const engine_1 = require("@tsparticles/engine");
    const BubbleBase_js_1 = require("./BubbleBase.js");
    const BubbleDiv_js_1 = require("./BubbleDiv.js");
    class Bubble extends BubbleBase_js_1.BubbleBase {
        load(data) {
            super.load(data);
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            this.divs = (0, engine_1.executeOnSingleOrMultiple)(data.divs, div => {
                const tmp = new BubbleDiv_js_1.BubbleDiv();
                tmp.load(div);
                return tmp;
            });
        }
    }
    exports.Bubble = Bubble;
});
