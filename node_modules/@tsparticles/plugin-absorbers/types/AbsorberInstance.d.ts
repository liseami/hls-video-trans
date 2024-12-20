import { type Container, type Engine, type ICoordinates, type IRgb, type Particle, type RecursivePartial, RotateDirection, Vector } from "@tsparticles/engine";
import type { Absorbers } from "./Absorbers.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";
import type { IAbsorberSizeLimit } from "./Options/Interfaces/IAbsorberSizeLimit.js";
type OrbitingParticle = Particle & {
    absorberOrbit?: Vector;
    absorberOrbitDirection?: RotateDirection;
    needsNewPosition?: boolean;
};
export declare class AbsorberInstance {
    color: IRgb;
    limit: IAbsorberSizeLimit;
    mass: number;
    readonly name?: string;
    opacity: number;
    position: Vector;
    size: number;
    private readonly _absorbers;
    private readonly _container;
    private readonly _engine;
    private dragging;
    private readonly initialPosition?;
    private readonly options;
    constructor(absorbers: Absorbers, container: Container, engine: Engine, options: RecursivePartial<IAbsorber>, position?: ICoordinates);
    attract(particle: OrbitingParticle): void;
    draw(context: CanvasRenderingContext2D): void;
    resize(): void;
    private readonly _calcPosition;
    private readonly _updateParticlePosition;
}
export {};
