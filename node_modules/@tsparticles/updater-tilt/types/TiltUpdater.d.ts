import { type Container, type IDelta, type IParticleTransformValues, type IParticleUpdater, type RecursivePartial } from "@tsparticles/engine";
import type { ITiltParticlesOptions, TiltParticle, TiltParticlesOptions } from "./Types.js";
export declare class TiltUpdater implements IParticleUpdater {
    private readonly container;
    constructor(container: Container);
    getTransformValues(particle: TiltParticle): IParticleTransformValues;
    init(particle: TiltParticle): void;
    isEnabled(particle: TiltParticle): boolean;
    loadOptions(options: TiltParticlesOptions, ...sources: (RecursivePartial<ITiltParticlesOptions> | undefined)[]): void;
    update(particle: TiltParticle, delta: IDelta): Promise<void>;
}
