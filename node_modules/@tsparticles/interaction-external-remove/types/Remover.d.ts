import { ExternalInteractorBase, type IModes, type Modes, type RecursivePartial } from "@tsparticles/engine";
import type { IRemoveMode, RemoveContainer, RemoveMode } from "./Types.js";
export declare class Remover extends ExternalInteractorBase<RemoveContainer> {
    handleClickMode: (mode: string) => void;
    constructor(container: RemoveContainer);
    clear(): void;
    init(): void;
    interact(): void;
    isEnabled(): boolean;
    loadModeOptions(options: Modes & RemoveMode, ...sources: RecursivePartial<(IModes & IRemoveMode) | undefined>[]): void;
    reset(): void;
}
