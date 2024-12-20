import { getRangeValue } from "../Utils/NumberUtils.js";
import { isSsr } from "../Utils/Utils.js";
const defaultRatio = 1, defaultReduceFactor = 1;
export class Retina {
    constructor(container) {
        this.container = container;
        this.pixelRatio = defaultRatio;
        this.reduceFactor = defaultReduceFactor;
    }
    init() {
        const container = this.container, options = container.actualOptions;
        this.pixelRatio = !options.detectRetina || isSsr() ? defaultRatio : window.devicePixelRatio;
        this.reduceFactor = defaultReduceFactor;
        const ratio = this.pixelRatio, canvas = container.canvas;
        if (canvas.element) {
            const element = canvas.element;
            canvas.size.width = element.offsetWidth * ratio;
            canvas.size.height = element.offsetHeight * ratio;
        }
        const particles = options.particles, moveOptions = particles.move;
        this.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
        this.sizeAnimationSpeed = getRangeValue(particles.size.animation.speed) * ratio;
    }
    initParticle(particle) {
        const options = particle.options, ratio = this.pixelRatio, moveOptions = options.move, moveDistance = moveOptions.distance, props = particle.retina;
        props.moveDrift = getRangeValue(moveOptions.drift) * ratio;
        props.moveSpeed = getRangeValue(moveOptions.speed) * ratio;
        props.sizeAnimationSpeed = getRangeValue(options.size.animation.speed) * ratio;
        const maxDistance = props.maxDistance;
        maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
        maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;
        props.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
    }
}
