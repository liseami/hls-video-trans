"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmittersCircleShape = void 0;
const plugin_emitters_1 = require("@tsparticles/plugin-emitters");
const engine_1 = require("@tsparticles/engine");
const quarter = 0.25, double = 2, doublePI = Math.PI * double, squareExp = 2, half = 0.5;
class EmittersCircleShape extends plugin_emitters_1.EmitterShapeBase {
    constructor(position, size, fill, options) {
        super(position, size, fill, options);
    }
    async init() {
    }
    randomPosition() {
        const size = this.size, fill = this.fill, position = this.position, generateTheta = (x, y) => {
            const u = (0, engine_1.getRandom)() * quarter, theta = Math.atan((y / x) * Math.tan(doublePI * u)), v = (0, engine_1.getRandom)();
            if (v < quarter) {
                return theta;
            }
            else if (v < double * quarter) {
                return Math.PI - theta;
            }
            else if (v < double * quarter + quarter) {
                return Math.PI + theta;
            }
            else {
                return -theta;
            }
        }, radius = (x, y, theta) => (x * y) / Math.sqrt((y * Math.cos(theta)) ** squareExp + (x * Math.sin(theta)) ** squareExp), [a, b] = [size.width * half, size.height * half], randomTheta = generateTheta(a, b), maxRadius = radius(a, b, randomTheta), randomRadius = fill ? maxRadius * Math.sqrt((0, engine_1.getRandom)()) : maxRadius;
        return {
            position: {
                x: position.x + randomRadius * Math.cos(randomTheta),
                y: position.y + randomRadius * Math.sin(randomTheta),
            },
        };
    }
}
exports.EmittersCircleShape = EmittersCircleShape;
