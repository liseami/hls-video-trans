(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./Options/Classes/Life.js", "./Utils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LifeUpdater = void 0;
    const engine_1 = require("@tsparticles/engine");
    const Life_js_1 = require("./Options/Classes/Life.js");
    const Utils_js_1 = require("./Utils.js");
    const noTime = 0, identity = 1, infiniteValue = -1;
    class LifeUpdater {
        constructor(container) {
            this.container = container;
        }
        init(particle) {
            const container = this.container, particlesOptions = particle.options, lifeOptions = particlesOptions.life;
            if (!lifeOptions) {
                return;
            }
            particle.life = {
                delay: container.retina.reduceFactor
                    ? (((0, engine_1.getRangeValue)(lifeOptions.delay.value) * (lifeOptions.delay.sync ? identity : (0, engine_1.getRandom)())) /
                        container.retina.reduceFactor) *
                        engine_1.millisecondsToSeconds
                    : noTime,
                delayTime: noTime,
                duration: container.retina.reduceFactor
                    ? (((0, engine_1.getRangeValue)(lifeOptions.duration.value) * (lifeOptions.duration.sync ? identity : (0, engine_1.getRandom)())) /
                        container.retina.reduceFactor) *
                        engine_1.millisecondsToSeconds
                    : noTime,
                time: noTime,
                count: lifeOptions.count,
            };
            if (particle.life.duration <= noTime) {
                particle.life.duration = infiniteValue;
            }
            if (particle.life.count <= noTime) {
                particle.life.count = infiniteValue;
            }
            if (particle.life) {
                particle.spawning = particle.life.delay > noTime;
            }
        }
        isEnabled(particle) {
            return !particle.destroyed;
        }
        loadOptions(options, ...sources) {
            if (!options.life) {
                options.life = new Life_js_1.Life();
            }
            for (const source of sources) {
                options.life.load(source?.life);
            }
        }
        update(particle, delta) {
            if (!this.isEnabled(particle) || !particle.life) {
                return;
            }
            (0, Utils_js_1.updateLife)(particle, delta, this.container.canvas.size);
        }
    }
    exports.LifeUpdater = LifeUpdater;
});
