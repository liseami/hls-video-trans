import type { ConnectContainer, ConnectMode, IConnectMode } from "./Types.js";
import { ExternalInteractorBase, type IModes, type Modes, type Particle, type RecursivePartial } from "@tsparticles/engine";
export declare class Connector extends ExternalInteractorBase<ConnectContainer> {
    constructor(container: ConnectContainer);
    clear(): void;
    init(): void;
    interact(): void;
    isEnabled(particle?: Particle): boolean;
    loadModeOptions(options: Modes & ConnectMode, ...sources: RecursivePartial<(IModes & IConnectMode) | undefined>[]): void;
    reset(): void;
}
