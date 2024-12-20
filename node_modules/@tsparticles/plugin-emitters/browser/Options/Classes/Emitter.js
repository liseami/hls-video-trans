import { AnimatableColor, deepExtend, executeOnSingleOrMultiple, isNull, setRangeValue, } from "@tsparticles/engine";
import { EmitterLife } from "./EmitterLife.js";
import { EmitterRate } from "./EmitterRate.js";
import { EmitterShape } from "./EmitterShape.js";
import { EmitterSize } from "./EmitterSize.js";
export class Emitter {
    constructor() {
        this.autoPlay = true;
        this.fill = true;
        this.life = new EmitterLife();
        this.rate = new EmitterRate();
        this.shape = new EmitterShape();
        this.startCount = 0;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }
        if (data.size !== undefined) {
            if (!this.size) {
                this.size = new EmitterSize();
            }
            this.size.load(data.size);
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        this.domId = data.domId;
        if (data.fill !== undefined) {
            this.fill = data.fill;
        }
        this.life.load(data.life);
        this.name = data.name;
        this.particles = executeOnSingleOrMultiple(data.particles, particles => {
            return deepExtend({}, particles);
        });
        this.rate.load(data.rate);
        this.shape.load(data.shape);
        if (data.position !== undefined) {
            this.position = {};
            if (data.position.x !== undefined) {
                this.position.x = setRangeValue(data.position.x);
            }
            if (data.position.y !== undefined) {
                this.position.y = setRangeValue(data.position.y);
            }
        }
        if (data.spawnColor !== undefined) {
            if (this.spawnColor === undefined) {
                this.spawnColor = new AnimatableColor();
            }
            this.spawnColor.load(data.spawnColor);
        }
        if (data.startCount !== undefined) {
            this.startCount = data.startCount;
        }
    }
}
