(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./Options/Classes/Rotate.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RotateUpdater = void 0;
    const engine_1 = require("@tsparticles/engine");
    const Rotate_js_1 = require("./Options/Classes/Rotate.js");
    const double = 2, doublePI = Math.PI * double, identity = 1, doublePIDeg = 360;
    class RotateUpdater {
        constructor(container) {
            this.container = container;
        }
        init(particle) {
            const rotateOptions = particle.options.rotate;
            if (!rotateOptions) {
                return;
            }
            particle.rotate = {
                enable: rotateOptions.animation.enable,
                value: (0, engine_1.degToRad)((0, engine_1.getRangeValue)(rotateOptions.value)),
                min: 0,
                max: doublePI,
            };
            particle.pathRotation = rotateOptions.path;
            let rotateDirection = rotateOptions.direction;
            if (rotateDirection === engine_1.RotateDirection.random) {
                const index = Math.floor((0, engine_1.getRandom)() * double), minIndex = 0;
                rotateDirection = index > minIndex ? engine_1.RotateDirection.counterClockwise : engine_1.RotateDirection.clockwise;
            }
            switch (rotateDirection) {
                case engine_1.RotateDirection.counterClockwise:
                case "counterClockwise":
                    particle.rotate.status = engine_1.AnimationStatus.decreasing;
                    break;
                case engine_1.RotateDirection.clockwise:
                    particle.rotate.status = engine_1.AnimationStatus.increasing;
                    break;
            }
            const rotateAnimation = rotateOptions.animation;
            if (rotateAnimation.enable) {
                particle.rotate.decay = identity - (0, engine_1.getRangeValue)(rotateAnimation.decay);
                particle.rotate.velocity =
                    ((0, engine_1.getRangeValue)(rotateAnimation.speed) / doublePIDeg) * this.container.retina.reduceFactor;
                if (!rotateAnimation.sync) {
                    particle.rotate.velocity *= (0, engine_1.getRandom)();
                }
            }
            particle.rotation = particle.rotate.value;
        }
        isEnabled(particle) {
            const rotate = particle.options.rotate;
            if (!rotate) {
                return false;
            }
            return !particle.destroyed && !particle.spawning && (!!rotate.value || rotate.animation.enable || rotate.path);
        }
        loadOptions(options, ...sources) {
            if (!options.rotate) {
                options.rotate = new Rotate_js_1.Rotate();
            }
            for (const source of sources) {
                options.rotate.load(source?.rotate);
            }
        }
        update(particle, delta) {
            if (!this.isEnabled(particle)) {
                return;
            }
            particle.isRotating = !!particle.rotate;
            if (!particle.rotate) {
                return;
            }
            (0, engine_1.updateAnimation)(particle, particle.rotate, false, engine_1.DestroyType.none, delta);
            particle.rotation = particle.rotate.value;
        }
    }
    exports.RotateUpdater = RotateUpdater;
});
