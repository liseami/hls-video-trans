import { type Container, type IDelta, type IParticleUpdater, type Particle, type RecursivePartial } from "@tsparticles/engine";
import type { ILifeParticlesOptions, LifeParticle, LifeParticlesOptions } from "./Types.js";
export declare class LifeUpdater implements IParticleUpdater {
    private readonly container;
    constructor(container: Container);
    init(particle: LifeParticle): void;
    isEnabled(particle: Particle): boolean;
    loadOptions(options: LifeParticlesOptions, ...sources: (RecursivePartial<ILifeParticlesOptions> | undefined)[]): void;
    update(particle: LifeParticle, delta: IDelta): void;
}
