import { type Engine, ParticlesInteractorBase, type RecursivePartial } from "@tsparticles/engine";
import type { IParticlesLinkOptions, LinkContainer, LinkParticle, ParticlesLinkOptions } from "./Types.js";
export declare class Linker extends ParticlesInteractorBase {
    private readonly _engine;
    private readonly _linkContainer;
    constructor(container: LinkContainer, engine: Engine);
    clear(): void;
    init(): void;
    interact(p1: LinkParticle): void;
    isEnabled(particle: LinkParticle): boolean;
    loadParticlesOptions(options: ParticlesLinkOptions, ...sources: (RecursivePartial<IParticlesLinkOptions> | undefined)[]): void;
    reset(): void;
    private readonly _setColor;
}
