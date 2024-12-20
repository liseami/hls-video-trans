(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./Utils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BounceOutMode = void 0;
    const engine_1 = require("@tsparticles/engine");
    const Utils_js_1 = require("./Utils.js");
    class BounceOutMode {
        constructor(container) {
            this.container = container;
            this.modes = [
                engine_1.OutMode.bounce,
                engine_1.OutMode.split,
            ];
        }
        update(particle, direction, delta, outMode) {
            if (!this.modes.includes(outMode)) {
                return;
            }
            const container = this.container;
            let handled = false;
            for (const plugin of container.plugins.values()) {
                if (plugin.particleBounce !== undefined) {
                    handled = plugin.particleBounce(particle, delta, direction);
                }
                if (handled) {
                    break;
                }
            }
            if (handled) {
                return;
            }
            const pos = particle.getPosition(), offset = particle.offset, size = particle.getRadius(), bounds = (0, engine_1.calculateBounds)(pos, size), canvasSize = container.canvas.size;
            (0, Utils_js_1.bounceHorizontal)({ particle, outMode, direction, bounds, canvasSize, offset, size });
            (0, Utils_js_1.bounceVertical)({ particle, outMode, direction, bounds, canvasSize, offset, size });
        }
    }
    exports.BounceOutMode = BounceOutMode;
});
