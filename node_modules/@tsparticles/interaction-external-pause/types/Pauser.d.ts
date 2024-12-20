import { type Container, ExternalInteractorBase } from "@tsparticles/engine";
export declare class Pauser extends ExternalInteractorBase {
    handleClickMode: (mode: string) => void;
    constructor(container: Container);
    clear(): void;
    init(): void;
    interact(): void;
    isEnabled(): boolean;
    reset(): void;
}
