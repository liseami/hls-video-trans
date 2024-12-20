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
    exports.BubbleBase = void 0;
    const engine_1 = require("@tsparticles/engine");
    class BubbleBase {
        constructor() {
            this.distance = 200;
            this.duration = 0.4;
            this.mix = false;
        }
        load(data) {
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }
            if (data.duration !== undefined) {
                this.duration = data.duration;
            }
            if (data.mix !== undefined) {
                this.mix = data.mix;
            }
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
            if (data.color !== undefined) {
                const sourceColor = (0, engine_1.isArray)(this.color) ? undefined : this.color;
                this.color = (0, engine_1.executeOnSingleOrMultiple)(data.color, color => {
                    return engine_1.OptionsColor.create(sourceColor, color);
                });
            }
            if (data.size !== undefined) {
                this.size = data.size;
            }
        }
    }
    exports.BubbleBase = BubbleBase;
});
