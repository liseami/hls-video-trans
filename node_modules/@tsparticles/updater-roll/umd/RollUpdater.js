(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Utils.js", "./Options/Classes/Roll.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RollUpdater = void 0;
    const Utils_js_1 = require("./Utils.js");
    const Roll_js_1 = require("./Options/Classes/Roll.js");
    class RollUpdater {
        constructor(engine) {
            this._engine = engine;
        }
        getTransformValues(particle) {
            const roll = particle.roll?.enable && particle.roll, rollHorizontal = roll && roll.horizontal, rollVertical = roll && roll.vertical;
            return {
                a: rollHorizontal ? Math.cos(roll.angle) : undefined,
                d: rollVertical ? Math.sin(roll.angle) : undefined,
            };
        }
        init(particle) {
            (0, Utils_js_1.initParticle)(this._engine, particle);
        }
        isEnabled(particle) {
            const roll = particle.options.roll;
            return !particle.destroyed && !particle.spawning && !!roll?.enable;
        }
        loadOptions(options, ...sources) {
            if (!options.roll) {
                options.roll = new Roll_js_1.Roll();
            }
            for (const source of sources) {
                options.roll.load(source?.roll);
            }
        }
        update(particle, delta) {
            if (!this.isEnabled(particle)) {
                return;
            }
            (0, Utils_js_1.updateRoll)(particle, delta);
        }
    }
    exports.RollUpdater = RollUpdater;
});
