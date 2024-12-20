import { initParticle, updateRoll } from "./Utils.js";
import { Roll } from "./Options/Classes/Roll.js";
export class RollUpdater {
    constructor(engine) {
        this._engine = engine;
    }
    getTransformValues(particle) {
        const roll = particle.roll?.enable && particle.roll, rollHorizontal = roll && roll.horizontal, rollVertical = roll && roll.vertical;
        return {
            a: rollHorizontal ? Math.cos(roll.angle) : undefined,
            d: rollVertical ? Math.sin(roll.angle) : undefined,
        };
    }
    init(particle) {
        initParticle(this._engine, particle);
    }
    isEnabled(particle) {
        const roll = particle.options.roll;
        return !particle.destroyed && !particle.spawning && !!roll?.enable;
    }
    loadOptions(options, ...sources) {
        if (!options.roll) {
            options.roll = new Roll();
        }
        for (const source of sources) {
            options.roll.load(source?.roll);
        }
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateRoll(particle, delta);
    }
}
