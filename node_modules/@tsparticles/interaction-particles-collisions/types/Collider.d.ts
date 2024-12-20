import { type Container, type IDelta, type Particle, ParticlesInteractorBase } from "@tsparticles/engine";
export declare class Collider extends ParticlesInteractorBase {
    constructor(container: Container);
    clear(): void;
    init(): void;
    interact(p1: Particle, delta: IDelta): void;
    isEnabled(particle: Particle): boolean;
    reset(): void;
}
