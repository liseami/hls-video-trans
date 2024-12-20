import { type Container, type Engine, type IDelta, type IParticleUpdater, type Particle } from "@tsparticles/engine";
export declare class ColorUpdater implements IParticleUpdater {
    private readonly _container;
    private readonly _engine;
    constructor(container: Container, engine: Engine);
    init(particle: Particle): void;
    isEnabled(particle: Particle): boolean;
    update(particle: Particle, delta: IDelta): void;
}
