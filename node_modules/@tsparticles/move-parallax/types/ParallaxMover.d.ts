import { type IParticleMover, type Particle } from "@tsparticles/engine";
export declare class ParallaxMover implements IParticleMover {
    init(): void;
    isEnabled(particle: Particle): boolean;
    move(particle: Particle): void;
}
