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
    exports.split = split;
    const engine_1 = require("@tsparticles/engine");
    const defaultOffset = 0, minDestroySize = 0.5, defaultSplitCount = 0, increment = 1, unbreakableTime = 500, minSplitCount = 0;
    function addSplitParticle(engine, container, parent, splitParticlesOptions) {
        const destroyOptions = parent.options.destroy;
        if (!destroyOptions) {
            return;
        }
        const splitOptions = destroyOptions.split, options = (0, engine_1.loadParticlesOptions)(engine, container, parent.options), factor = (0, engine_1.getRangeValue)(splitOptions.factor.value), parentColor = parent.getFillColor();
        if (splitOptions.color) {
            options.color.load(splitOptions.color);
        }
        else if (splitOptions.colorOffset && parentColor) {
            options.color.load({
                value: {
                    hsl: {
                        h: parentColor.h + (0, engine_1.getRangeValue)(splitOptions.colorOffset.h ?? defaultOffset),
                        s: parentColor.s + (0, engine_1.getRangeValue)(splitOptions.colorOffset.s ?? defaultOffset),
                        l: parentColor.l + (0, engine_1.getRangeValue)(splitOptions.colorOffset.l ?? defaultOffset),
                    },
                },
            });
        }
        else {
            options.color.load({
                value: {
                    hsl: parent.getFillColor(),
                },
            });
        }
        options.move.load({
            center: {
                x: parent.position.x,
                y: parent.position.y,
                mode: engine_1.PixelMode.precise,
            },
        });
        if ((0, engine_1.isNumber)(options.size.value)) {
            options.size.value /= factor;
        }
        else {
            options.size.value.min /= factor;
            options.size.value.max /= factor;
        }
        options.load(splitParticlesOptions);
        const offset = splitOptions.sizeOffset ? (0, engine_1.setRangeValue)(-parent.size.value, parent.size.value) : defaultOffset, position = {
            x: parent.position.x + (0, engine_1.randomInRange)(offset),
            y: parent.position.y + (0, engine_1.randomInRange)(offset),
        };
        return container.particles.addParticle(position, options, parent.group, (particle) => {
            if (particle.size.value < minDestroySize) {
                return false;
            }
            particle.velocity.length = (0, engine_1.randomInRange)((0, engine_1.setRangeValue)(parent.velocity.length, particle.velocity.length));
            particle.splitCount = (parent.splitCount ?? defaultSplitCount) + increment;
            particle.unbreakable = true;
            setTimeout(() => {
                particle.unbreakable = false;
            }, unbreakableTime);
            return true;
        });
    }
    function split(engine, container, particle) {
        const destroyOptions = particle.options.destroy;
        if (!destroyOptions) {
            return;
        }
        const splitOptions = destroyOptions.split;
        if (splitOptions.count >= minSplitCount &&
            (particle.splitCount === undefined || particle.splitCount++ > splitOptions.count)) {
            return;
        }
        const rate = (0, engine_1.getRangeValue)(splitOptions.rate.value), particlesSplitOptions = (0, engine_1.itemFromSingleOrMultiple)(splitOptions.particles);
        for (let i = 0; i < rate; i++) {
            addSplitParticle(engine, container, particle, particlesSplitOptions);
        }
    }
});
