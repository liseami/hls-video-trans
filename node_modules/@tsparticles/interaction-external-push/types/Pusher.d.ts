import { ExternalInteractorBase, type IModes, type Modes, type RecursivePartial } from "@tsparticles/engine";
import type { IPushMode, PushContainer, PushMode } from "./Types.js";
export declare class Pusher extends ExternalInteractorBase<PushContainer> {
    handleClickMode: (mode: string) => void;
    constructor(container: PushContainer);
    clear(): void;
    init(): void;
    interact(): void;
    isEnabled(): boolean;
    loadModeOptions(options: Modes & PushMode, ...sources: RecursivePartial<(IModes & IPushMode) | undefined>[]): void;
    reset(): void;
}
