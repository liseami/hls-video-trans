import { type Engine, type IParticleColorStyle, type IParticleUpdater, type Particle, type RecursivePartial } from "@tsparticles/engine";
import type { ITwinkleParticlesOptions, TwinkeParticle, TwinkleParticlesOptions } from "./Types.js";
export declare class TwinkleUpdater implements IParticleUpdater {
    private readonly _engine;
    constructor(engine: Engine);
    getColorStyles(particle: Particle, context: CanvasRenderingContext2D, radius: number, opacity: number): IParticleColorStyle;
    init(): Promise<void>;
    isEnabled(particle: TwinkeParticle): boolean;
    loadOptions(options: TwinkleParticlesOptions, ...sources: (RecursivePartial<ITwinkleParticlesOptions> | undefined)[]): void;
    update(): Promise<void>;
}
