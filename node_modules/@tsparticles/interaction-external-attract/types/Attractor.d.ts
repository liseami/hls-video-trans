import type { AttractContainer, AttractMode, IAttractMode } from "./Types.js";
import { type Engine, ExternalInteractorBase, type IModes, type Modes, type Particle, type RecursivePartial } from "@tsparticles/engine";
export declare class Attractor extends ExternalInteractorBase<AttractContainer> {
    handleClickMode: (mode: string) => void;
    private readonly _engine;
    constructor(engine: Engine, container: AttractContainer);
    clear(): void;
    init(): void;
    interact(): void;
    isEnabled(particle?: Particle): boolean;
    loadModeOptions(options: Modes & AttractMode, ...sources: RecursivePartial<(IModes & IAttractMode) | undefined>[]): void;
    reset(): void;
}
