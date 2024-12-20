"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retina = void 0;
const NumberUtils_1 = require("../Utils/NumberUtils");
const Utils_1 = require("../Utils/Utils");
class Retina {
    constructor(container) {
        this.container = container;
        this.pixelRatio = 1;
        this.reduceFactor = 1;
    }
    init() {
        const container = this.container, options = container.actualOptions;
        this.pixelRatio = !options.detectRetina || (0, Utils_1.isSsr)() ? 1 : window.devicePixelRatio;
        this.reduceFactor = 1;
        const ratio = this.pixelRatio;
        if (container.canvas.element) {
            const element = container.canvas.element;
            container.canvas.size.width = element.offsetWidth * ratio;
            container.canvas.size.height = element.offsetHeight * ratio;
        }
        const particles = options.particles, moveOptions = particles.move;
        this.attractDistance = (0, NumberUtils_1.getRangeValue)(moveOptions.attract.distance) * ratio;
        this.maxSpeed = (0, NumberUtils_1.getRangeValue)(moveOptions.gravity.maxSpeed) * ratio;
        this.sizeAnimationSpeed = (0, NumberUtils_1.getRangeValue)(particles.size.animation.speed) * ratio;
    }
    initParticle(particle) {
        const options = particle.options, ratio = this.pixelRatio, moveOptions = options.move, moveDistance = moveOptions.distance, props = particle.retina;
        props.attractDistance = (0, NumberUtils_1.getRangeValue)(moveOptions.attract.distance) * ratio;
        props.moveDrift = (0, NumberUtils_1.getRangeValue)(moveOptions.drift) * ratio;
        props.moveSpeed = (0, NumberUtils_1.getRangeValue)(moveOptions.speed) * ratio;
        props.sizeAnimationSpeed = (0, NumberUtils_1.getRangeValue)(options.size.animation.speed) * ratio;
        const maxDistance = props.maxDistance;
        maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
        maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;
        props.maxSpeed = (0, NumberUtils_1.getRangeValue)(moveOptions.gravity.maxSpeed) * ratio;
    }
}
exports.Retina = Retina;
