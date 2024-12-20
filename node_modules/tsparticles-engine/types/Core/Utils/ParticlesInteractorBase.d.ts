import type { Container } from "../Container";
import type { IDelta } from "../Interfaces/IDelta";
import type { IParticlesInteractor } from "../Interfaces/IParticlesInteractor";
import { InteractorType } from "../../Enums/Types/InteractorType";
import type { Particle } from "../Particle";
export declare abstract class ParticlesInteractorBase<TContainer extends Container = Container> implements IParticlesInteractor {
    protected readonly container: TContainer;
    type: InteractorType;
    protected constructor(container: TContainer);
    abstract clear(particle: Particle, delta: IDelta): void;
    abstract init(): void;
    abstract interact(particle: Particle, delta: IDelta): Promise<void>;
    abstract isEnabled(particle: Particle): boolean;
    abstract reset(particle: Particle): void;
}
