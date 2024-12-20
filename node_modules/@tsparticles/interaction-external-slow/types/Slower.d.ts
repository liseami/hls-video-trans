import { ExternalInteractorBase, type IDelta, type IModes, type Modes, type Particle, type RecursivePartial } from "@tsparticles/engine";
import type { ISlowMode, SlowContainer, SlowMode } from "./Types.js";
export declare class Slower extends ExternalInteractorBase<SlowContainer> {
    constructor(container: SlowContainer);
    clear(particle: Particle, delta: IDelta, force?: boolean): void;
    init(): void;
    interact(): void;
    isEnabled(particle?: Particle): boolean;
    loadModeOptions(options: Modes & SlowMode, ...sources: RecursivePartial<(IModes & ISlowMode) | undefined>[]): void;
    reset(particle: Particle): void;
}
