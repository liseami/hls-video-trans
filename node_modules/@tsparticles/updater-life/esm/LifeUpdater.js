import { getRandom, getRangeValue, millisecondsToSeconds, } from "@tsparticles/engine";
import { Life } from "./Options/Classes/Life.js";
import { updateLife } from "./Utils.js";
const noTime = 0, identity = 1, infiniteValue = -1;
export class LifeUpdater {
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
                ? ((getRangeValue(lifeOptions.delay.value) * (lifeOptions.delay.sync ? identity : getRandom())) /
                    container.retina.reduceFactor) *
                    millisecondsToSeconds
                : noTime,
            delayTime: noTime,
            duration: container.retina.reduceFactor
                ? ((getRangeValue(lifeOptions.duration.value) * (lifeOptions.duration.sync ? identity : getRandom())) /
                    container.retina.reduceFactor) *
                    millisecondsToSeconds
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
            options.life = new Life();
        }
        for (const source of sources) {
            options.life.load(source?.life);
        }
    }
    update(particle, delta) {
        if (!this.isEnabled(particle) || !particle.life) {
            return;
        }
        updateLife(particle, delta, this.container.canvas.size);
    }
}
