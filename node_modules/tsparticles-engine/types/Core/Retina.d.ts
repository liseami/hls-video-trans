import type { Container } from "./Container";
import type { Particle } from "./Particle";
export declare class Retina {
    private readonly container;
    attractDistance: number;
    maxSpeed: number;
    pixelRatio: number;
    reduceFactor: number;
    sizeAnimationSpeed: number;
    constructor(container: Container);
    init(): void;
    initParticle(particle: Particle): void;
}
