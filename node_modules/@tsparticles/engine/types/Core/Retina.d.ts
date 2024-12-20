import type { Container } from "./Container.js";
import type { Particle } from "./Particle.js";
export declare class Retina {
    private readonly container;
    maxSpeed: number;
    pixelRatio: number;
    reduceFactor: number;
    sizeAnimationSpeed: number;
    constructor(container: Container);
    init(): void;
    initParticle(particle: Particle): void;
}
