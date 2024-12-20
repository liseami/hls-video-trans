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
    exports.ParallaxMover = void 0;
    const engine_1 = require("@tsparticles/engine");
    const half = 0.5;
    class ParallaxMover {
        init() {
        }
        isEnabled(particle) {
            return (!(0, engine_1.isSsr)() &&
                !particle.destroyed &&
                particle.container.actualOptions.interactivity.events.onHover.parallax.enable);
        }
        move(particle) {
            const container = particle.container, options = container.actualOptions, parallaxOptions = options.interactivity.events.onHover.parallax;
            if ((0, engine_1.isSsr)() || !parallaxOptions.enable) {
                return;
            }
            const parallaxForce = parallaxOptions.force, mousePos = container.interactivity.mouse.position;
            if (!mousePos) {
                return;
            }
            const canvasSize = container.canvas.size, canvasCenter = {
                x: canvasSize.width * half,
                y: canvasSize.height * half,
            }, parallaxSmooth = parallaxOptions.smooth, factor = particle.getRadius() / parallaxForce, centerDistance = {
                x: (mousePos.x - canvasCenter.x) * factor,
                y: (mousePos.y - canvasCenter.y) * factor,
            }, { offset } = particle;
            offset.x += (centerDistance.x - offset.x) / parallaxSmooth;
            offset.y += (centerDistance.y - offset.y) / parallaxSmooth;
        }
    }
    exports.ParallaxMover = ParallaxMover;
});
