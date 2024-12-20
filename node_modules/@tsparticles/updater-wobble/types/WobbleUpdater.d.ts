import { type Container, type IDelta, type IParticleUpdater, type RecursivePartial } from "@tsparticles/engine";
import type { IWobbleParticlesOptions, WobbleParticle, WobbleParticlesOptions } from "./Types.js";
export declare class WobbleUpdater implements IParticleUpdater {
    private readonly container;
    constructor(container: Container);
    init(particle: WobbleParticle): void;
    isEnabled(particle: WobbleParticle): boolean;
    loadOptions(options: WobbleParticlesOptions, ...sources: (RecursivePartial<IWobbleParticlesOptions> | undefined)[]): void;
    update(particle: WobbleParticle, delta: IDelta): void;
}
