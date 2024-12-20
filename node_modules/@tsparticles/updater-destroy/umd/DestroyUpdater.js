(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./Options/Classes/Destroy.js", "./Enums/DestroyMode.js", "./Utils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DestroyUpdater = void 0;
    const engine_1 = require("@tsparticles/engine");
    const Destroy_js_1 = require("./Options/Classes/Destroy.js");
    const DestroyMode_js_1 = require("./Enums/DestroyMode.js");
    const Utils_js_1 = require("./Utils.js");
    class DestroyUpdater {
        constructor(engine, container) {
            this.container = container;
            this.engine = engine;
        }
        init(particle) {
            const container = this.container, particlesOptions = particle.options, destroyOptions = particlesOptions.destroy;
            if (!destroyOptions) {
                return;
            }
            particle.splitCount = 0;
            const destroyBoundsOptions = destroyOptions.bounds;
            if (!particle.destroyBounds) {
                particle.destroyBounds = {};
            }
            const { bottom, left, right, top } = destroyBoundsOptions, { destroyBounds } = particle, canvasSize = container.canvas.size;
            if (bottom) {
                destroyBounds.bottom = ((0, engine_1.getRangeValue)(bottom) * canvasSize.height) / engine_1.percentDenominator;
            }
            if (left) {
                destroyBounds.left = ((0, engine_1.getRangeValue)(left) * canvasSize.width) / engine_1.percentDenominator;
            }
            if (right) {
                destroyBounds.right = ((0, engine_1.getRangeValue)(right) * canvasSize.width) / engine_1.percentDenominator;
            }
            if (top) {
                destroyBounds.top = ((0, engine_1.getRangeValue)(top) * canvasSize.height) / engine_1.percentDenominator;
            }
        }
        isEnabled(particle) {
            return !particle.destroyed;
        }
        loadOptions(options, ...sources) {
            if (!options.destroy) {
                options.destroy = new Destroy_js_1.Destroy();
            }
            for (const source of sources) {
                options.destroy.load(source?.destroy);
            }
        }
        particleDestroyed(particle, override) {
            if (override) {
                return;
            }
            const destroyOptions = particle.options.destroy;
            if (destroyOptions && destroyOptions.mode === DestroyMode_js_1.DestroyMode.split) {
                (0, Utils_js_1.split)(this.engine, this.container, particle);
            }
        }
        update(particle) {
            if (!this.isEnabled(particle)) {
                return;
            }
            const position = particle.getPosition(), bounds = particle.destroyBounds;
            if (!bounds) {
                return;
            }
            if ((bounds.bottom !== undefined && position.y >= bounds.bottom) ||
                (bounds.left !== undefined && position.x <= bounds.left) ||
                (bounds.right !== undefined && position.x >= bounds.right) ||
                (bounds.top !== undefined && position.y <= bounds.top)) {
                particle.destroy();
            }
        }
    }
    exports.DestroyUpdater = DestroyUpdater;
});
