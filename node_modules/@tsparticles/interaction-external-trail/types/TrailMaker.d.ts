import { ExternalInteractorBase, type IDelta, type IModes, type Modes, type Particle, type RecursivePartial } from "@tsparticles/engine";
import type { ITrailMode, TrailContainer, TrailMode } from "./Types.js";
export declare class TrailMaker extends ExternalInteractorBase<TrailContainer> {
    private _delay;
    private _lastPosition?;
    constructor(container: TrailContainer);
    clear(): void;
    init(): void;
    interact(delta: IDelta): void;
    isEnabled(particle?: Particle): boolean;
    loadModeOptions(options: Modes & TrailMode, ...sources: RecursivePartial<(IModes & ITrailMode) | undefined>[]): void;
    reset(): void;
}
