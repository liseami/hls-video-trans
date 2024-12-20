import type { Container } from "../Container.js";
import type { Engine } from "../Engine.js";
import type { IDelta } from "../Interfaces/IDelta.js";
import type { Particle } from "../Particle.js";
export declare class InteractionManager {
    private readonly container;
    private readonly _engine;
    private _externalInteractors;
    private _interactors;
    private _particleInteractors;
    constructor(engine: Engine, container: Container);
    externalInteract(delta: IDelta): void;
    handleClickMode(mode: string): void;
    init(): Promise<void>;
    particlesInteract(particle: Particle, delta: IDelta): void;
    reset(particle: Particle): void;
}
