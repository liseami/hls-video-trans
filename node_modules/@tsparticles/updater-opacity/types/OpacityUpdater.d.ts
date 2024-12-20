import { type Container, type IDelta, type IParticleUpdater, type Particle } from "@tsparticles/engine";
export declare class OpacityUpdater implements IParticleUpdater {
    private readonly container;
    constructor(container: Container);
    init(particle: Particle): void;
    isEnabled(particle: Particle): boolean;
    reset(particle: Particle): void;
    update(particle: Particle, delta: IDelta): void;
}
