import { type Particle } from "@tsparticles/engine";
type BounceParticle = Particle & {
    collisionMaxSpeed?: number;
};
export declare function bounce(p1: BounceParticle, p2: BounceParticle): void;
export {};
