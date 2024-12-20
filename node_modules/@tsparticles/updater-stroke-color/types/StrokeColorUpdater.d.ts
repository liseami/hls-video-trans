import { type Container, type Engine, type IDelta, type IParticleUpdater, type Particle } from "@tsparticles/engine";
import type { StrokeParticle } from "./Types.js";
export declare class StrokeColorUpdater implements IParticleUpdater {
    private readonly _container;
    private readonly _engine;
    constructor(container: Container, engine: Engine);
    init(particle: StrokeParticle): void;
    isEnabled(particle: StrokeParticle): boolean;
    update(particle: Particle, delta: IDelta): void;
}
