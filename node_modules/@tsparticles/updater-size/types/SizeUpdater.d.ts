import { type IDelta, type IParticleUpdater, type Particle } from "@tsparticles/engine";
export declare class SizeUpdater implements IParticleUpdater {
    init(particle: Particle): void;
    isEnabled(particle: Particle): boolean;
    reset(particle: Particle): void;
    update(particle: Particle, delta: IDelta): void;
}
