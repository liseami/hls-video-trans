import type { ClickMode } from "../../Enums/Modes/ClickMode";
import type { Container } from "../Container";
import type { Engine } from "../Engine";
import type { IDelta } from "../Interfaces/IDelta";
import type { Particle } from "../Particle";
export declare class InteractionManager {
    private readonly container;
    private readonly _engine;
    private _externalInteractors;
    private readonly _interactors;
    private _particleInteractors;
    constructor(engine: Engine, container: Container);
    externalInteract(delta: IDelta): Promise<void>;
    handleClickMode(mode: ClickMode | string): void;
    init(): void;
    particlesInteract(particle: Particle, delta: IDelta): Promise<void>;
    reset(particle: Particle): Promise<void>;
}
