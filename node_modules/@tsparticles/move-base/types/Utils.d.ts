import { type IDelta, type Move, type Particle } from "@tsparticles/engine";
import type { MoveParticle } from "./Types.js";
export declare function applyDistance(particle: MoveParticle): void;
export declare function move(particle: MoveParticle, moveOptions: Move, moveSpeed: number, maxSpeed: number, moveDrift: number, delta: IDelta): void;
export declare function spin(particle: MoveParticle, moveSpeed: number): void;
export declare function applyPath(particle: Particle, delta: IDelta): void;
export declare function getProximitySpeedFactor(particle: Particle): number;
export declare function initSpin(particle: MoveParticle): void;
