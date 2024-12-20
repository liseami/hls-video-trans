import { type Container, type Particle, ParticlesInteractorBase } from "@tsparticles/engine";
import type { AttractParticle } from "./AttractParticle.js";
export declare class Attractor extends ParticlesInteractorBase<Container, AttractParticle> {
    constructor(container: Container);
    clear(): void;
    init(): void;
    interact(p1: AttractParticle): void;
    isEnabled(particle: Particle): boolean;
    reset(): void;
}
