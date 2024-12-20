import { type Container, type Engine, type IParticleUpdater, type Particle, type RecursivePartial } from "@tsparticles/engine";
import type { DestroyParticle, DestroyParticlesOptions, IDestroyParticlesOptions } from "./Types.js";
export declare class DestroyUpdater implements IParticleUpdater {
    private readonly container;
    private readonly engine;
    constructor(engine: Engine, container: Container);
    init(particle: DestroyParticle): void;
    isEnabled(particle: Particle): boolean;
    loadOptions(options: DestroyParticlesOptions, ...sources: (RecursivePartial<IDestroyParticlesOptions> | undefined)[]): void;
    particleDestroyed(particle: DestroyParticle, override?: boolean): void;
    update(particle: DestroyParticle): void;
}
