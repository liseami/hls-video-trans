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
    exports.updateLife = updateLife;
    const engine_1 = require("@tsparticles/engine");
    const noTime = 0, infiniteValue = -1, noLife = 0, minCanvasSize = 0;
    function updateLife(particle, delta, canvasSize) {
        if (!particle.life) {
            return;
        }
        const life = particle.life;
        let justSpawned = false;
        if (particle.spawning) {
            life.delayTime += delta.value;
            if (life.delayTime >= particle.life.delay) {
                justSpawned = true;
                particle.spawning = false;
                life.delayTime = noTime;
                life.time = noTime;
            }
            else {
                return;
            }
        }
        if (life.duration === infiniteValue) {
            return;
        }
        if (particle.spawning) {
            return;
        }
        if (justSpawned) {
            life.time = noTime;
        }
        else {
            life.time += delta.value;
        }
        if (life.time < life.duration) {
            return;
        }
        life.time = noTime;
        if (particle.life.count > noLife) {
            particle.life.count--;
        }
        if (particle.life.count === noLife) {
            particle.destroy();
            return;
        }
        const widthRange = (0, engine_1.setRangeValue)(minCanvasSize, canvasSize.width), heightRange = (0, engine_1.setRangeValue)(minCanvasSize, canvasSize.width);
        particle.position.x = (0, engine_1.randomInRange)(widthRange);
        particle.position.y = (0, engine_1.randomInRange)(heightRange);
        particle.spawning = true;
        life.delayTime = noTime;
        life.time = noTime;
        particle.reset();
        const lifeOptions = particle.options.life;
        if (lifeOptions) {
            life.delay = (0, engine_1.getRangeValue)(lifeOptions.delay.value) * engine_1.millisecondsToSeconds;
            life.duration = (0, engine_1.getRangeValue)(lifeOptions.duration.value) * engine_1.millisecondsToSeconds;
        }
    }
});
