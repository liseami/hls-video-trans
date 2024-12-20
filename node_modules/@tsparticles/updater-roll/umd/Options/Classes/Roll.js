(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./RollLight.js", "../../RollMode.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Roll = void 0;
    const engine_1 = require("@tsparticles/engine");
    const RollLight_js_1 = require("./RollLight.js");
    const RollMode_js_1 = require("../../RollMode.js");
    class Roll {
        constructor() {
            this.darken = new RollLight_js_1.RollLight();
            this.enable = false;
            this.enlighten = new RollLight_js_1.RollLight();
            this.mode = RollMode_js_1.RollMode.vertical;
            this.speed = 25;
        }
        load(data) {
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            if (data.backColor !== undefined) {
                this.backColor = engine_1.OptionsColor.create(this.backColor, data.backColor);
            }
            this.darken.load(data.darken);
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            this.enlighten.load(data.enlighten);
            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
            if (data.speed !== undefined) {
                this.speed = (0, engine_1.setRangeValue)(data.speed);
            }
        }
    }
    exports.Roll = Roll;
});
