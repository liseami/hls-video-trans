import { type Engine, type IContainerPlugin, type ICoordinates, type Particle, type RecursivePartial, type SingleOrMultiple } from "@tsparticles/engine";
import type { Absorber } from "./Options/Classes/Absorber.js";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import { AbsorberInstance } from "./AbsorberInstance.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";
export declare class Absorbers implements IContainerPlugin {
    absorbers: SingleOrMultiple<Absorber>;
    array: AbsorberInstance[];
    interactivityAbsorbers: SingleOrMultiple<Absorber>;
    private readonly _container;
    private readonly _engine;
    constructor(container: AbsorberContainer, engine: Engine);
    addAbsorber(options: RecursivePartial<IAbsorber>, position?: ICoordinates): Promise<AbsorberInstance>;
    draw(context: CanvasRenderingContext2D): void;
    handleClickMode(mode: string): void;
    init(): Promise<void>;
    particleUpdate(particle: Particle): void;
    removeAbsorber(absorber: AbsorberInstance): void;
    resize(): void;
    stop(): void;
}
