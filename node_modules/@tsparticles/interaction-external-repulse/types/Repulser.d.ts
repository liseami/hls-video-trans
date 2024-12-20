import { type Engine, ExternalInteractorBase, type IModes, type Modes, type Particle, type RecursivePartial } from "@tsparticles/engine";
import type { IRepulseMode, RepulseContainer, RepulseMode } from "./Types.js";
export declare class Repulser extends ExternalInteractorBase<RepulseContainer> {
    handleClickMode: (mode: string) => void;
    private readonly _engine;
    constructor(engine: Engine, container: RepulseContainer);
    clear(): void;
    init(): void;
    interact(): void;
    isEnabled(particle?: Particle): boolean;
    loadModeOptions(options: Modes & RepulseMode, ...sources: RecursivePartial<(IModes & IRepulseMode) | undefined>[]): void;
    reset(): void;
    private readonly _clickRepulse;
    private readonly _hoverRepulse;
    private readonly _processRepulse;
    private readonly _singleSelectorRepulse;
}
