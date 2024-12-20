import type { Container } from "../Container.js";
import type { IDelta } from "../Interfaces/IDelta.js";
import type { IExternalInteractor } from "../Interfaces/IExternalInteractor.js";
import { InteractorType } from "../../Enums/Types/InteractorType.js";
import type { Particle } from "../Particle.js";
export declare abstract class ExternalInteractorBase<TContainer extends Container = Container, TParticle extends Particle = Particle> implements IExternalInteractor<TParticle> {
    type: InteractorType;
    protected readonly container: TContainer;
    protected constructor(container: TContainer);
    abstract clear(particle: TParticle, delta: IDelta): void;
    abstract init(): void;
    abstract interact(delta: IDelta): void;
    abstract isEnabled(particle?: TParticle): boolean;
    abstract reset(particle: TParticle): void;
}
