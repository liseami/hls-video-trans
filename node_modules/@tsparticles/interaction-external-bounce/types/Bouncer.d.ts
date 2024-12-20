import type { BounceContainer, BounceMode, IBounceMode } from "./Types.js";
import { ExternalInteractorBase, type IModes, type Modes, type Particle, type RecursivePartial } from "@tsparticles/engine";
export declare class Bouncer extends ExternalInteractorBase<BounceContainer> {
    constructor(container: BounceContainer);
    clear(): void;
    init(): void;
    interact(): void;
    isEnabled(particle?: Particle): boolean;
    loadModeOptions(options: Modes & BounceMode, ...sources: RecursivePartial<(IModes & IBounceMode) | undefined>[]): void;
    reset(): void;
}
