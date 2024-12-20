(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./BounceOutMode.js", "./DestroyOutMode.js", "./NoneOutMode.js", "./OutOutMode.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OutOfCanvasUpdater = void 0;
    const engine_1 = require("@tsparticles/engine");
    const BounceOutMode_js_1 = require("./BounceOutMode.js");
    const DestroyOutMode_js_1 = require("./DestroyOutMode.js");
    const NoneOutMode_js_1 = require("./NoneOutMode.js");
    const OutOutMode_js_1 = require("./OutOutMode.js");
    const checkOutMode = (outModes, outMode) => {
        return (outModes.default === outMode ||
            outModes.bottom === outMode ||
            outModes.left === outMode ||
            outModes.right === outMode ||
            outModes.top === outMode);
    };
    class OutOfCanvasUpdater {
        constructor(container) {
            this._addUpdaterIfMissing = (particle, outMode, getUpdater) => {
                const outModes = particle.options.move.outModes;
                if (!this.updaters.has(outMode) && checkOutMode(outModes, outMode)) {
                    this.updaters.set(outMode, getUpdater(this.container));
                }
            };
            this._updateOutMode = (particle, delta, outMode, direction) => {
                for (const updater of this.updaters.values()) {
                    updater.update(particle, direction, delta, outMode);
                }
            };
            this.container = container;
            this.updaters = new Map();
        }
        init(particle) {
            this._addUpdaterIfMissing(particle, engine_1.OutMode.bounce, container => new BounceOutMode_js_1.BounceOutMode(container));
            this._addUpdaterIfMissing(particle, engine_1.OutMode.out, container => new OutOutMode_js_1.OutOutMode(container));
            this._addUpdaterIfMissing(particle, engine_1.OutMode.destroy, container => new DestroyOutMode_js_1.DestroyOutMode(container));
            this._addUpdaterIfMissing(particle, engine_1.OutMode.none, container => new NoneOutMode_js_1.NoneOutMode(container));
        }
        isEnabled(particle) {
            return !particle.destroyed && !particle.spawning;
        }
        update(particle, delta) {
            const outModes = particle.options.move.outModes;
            this._updateOutMode(particle, delta, outModes.bottom ?? outModes.default, engine_1.OutModeDirection.bottom);
            this._updateOutMode(particle, delta, outModes.left ?? outModes.default, engine_1.OutModeDirection.left);
            this._updateOutMode(particle, delta, outModes.right ?? outModes.default, engine_1.OutModeDirection.right);
            this._updateOutMode(particle, delta, outModes.top ?? outModes.default, engine_1.OutModeDirection.top);
        }
    }
    exports.OutOfCanvasUpdater = OutOfCanvasUpdater;
});
