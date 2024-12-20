(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Utils/NumberUtils.js", "../Utils/Utils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Retina = void 0;
    const NumberUtils_js_1 = require("../Utils/NumberUtils.js");
    const Utils_js_1 = require("../Utils/Utils.js");
    const defaultRatio = 1, defaultReduceFactor = 1;
    class Retina {
        constructor(container) {
            this.container = container;
            this.pixelRatio = defaultRatio;
            this.reduceFactor = defaultReduceFactor;
        }
        init() {
            const container = this.container, options = container.actualOptions;
            this.pixelRatio = !options.detectRetina || (0, Utils_js_1.isSsr)() ? defaultRatio : window.devicePixelRatio;
            this.reduceFactor = defaultReduceFactor;
            const ratio = this.pixelRatio, canvas = container.canvas;
            if (canvas.element) {
                const element = canvas.element;
                canvas.size.width = element.offsetWidth * ratio;
                canvas.size.height = element.offsetHeight * ratio;
            }
            const particles = options.particles, moveOptions = particles.move;
            this.maxSpeed = (0, NumberUtils_js_1.getRangeValue)(moveOptions.gravity.maxSpeed) * ratio;
            this.sizeAnimationSpeed = (0, NumberUtils_js_1.getRangeValue)(particles.size.animation.speed) * ratio;
        }
        initParticle(particle) {
            const options = particle.options, ratio = this.pixelRatio, moveOptions = options.move, moveDistance = moveOptions.distance, props = particle.retina;
            props.moveDrift = (0, NumberUtils_js_1.getRangeValue)(moveOptions.drift) * ratio;
            props.moveSpeed = (0, NumberUtils_js_1.getRangeValue)(moveOptions.speed) * ratio;
            props.sizeAnimationSpeed = (0, NumberUtils_js_1.getRangeValue)(options.size.animation.speed) * ratio;
            const maxDistance = props.maxDistance;
            maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
            maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;
            props.maxSpeed = (0, NumberUtils_js_1.getRangeValue)(moveOptions.gravity.maxSpeed) * ratio;
        }
    }
    exports.Retina = Retina;
});
