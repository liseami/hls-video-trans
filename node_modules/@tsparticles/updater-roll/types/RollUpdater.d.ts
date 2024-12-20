import { type Engine, type IDelta, type IParticleTransformValues, type IParticleUpdater, type Particle, type RecursivePartial } from "@tsparticles/engine";
import type { IRollParticlesOptions, RollParticle, RollParticlesOptions } from "./Types.js";
export declare class RollUpdater implements IParticleUpdater {
    private readonly _engine;
    constructor(engine: Engine);
    getTransformValues(particle: Particle): IParticleTransformValues;
    init(particle: RollParticle): void;
    isEnabled(particle: RollParticle): boolean;
    loadOptions(options: RollParticlesOptions, ...sources: (RecursivePartial<IRollParticlesOptions> | undefined)[]): void;
    update(particle: Particle, delta: IDelta): void;
}
