import { type Container, type IDelta, OutMode, type OutModeDirection, type Particle } from "@tsparticles/engine";
import type { IOutModeManager } from "./IOutModeManager.js";
export declare class DestroyOutMode implements IOutModeManager {
    private readonly container;
    modes: (OutMode | keyof typeof OutMode)[];
    constructor(container: Container);
    update(particle: Particle, direction: OutModeDirection, _delta: IDelta, outMode: OutMode | keyof typeof OutMode): void;
}
