import type { Container } from "../Container";
import type { IDelta } from "../Interfaces/IDelta";
import type { IExternalInteractor } from "../Interfaces/IExternalInteractor";
import { InteractorType } from "../../Enums/Types/InteractorType";
import type { Particle } from "../Particle";
export declare abstract class ExternalInteractorBase<TContainer extends Container = Container> implements IExternalInteractor {
    protected readonly container: TContainer;
    type: InteractorType;
    protected constructor(container: TContainer);
    abstract clear(particle: Particle, delta: IDelta): void;
    abstract init(): void;
    abstract interact(delta: IDelta): Promise<void>;
    abstract isEnabled(particle?: Particle): boolean;
    abstract reset(particle: Particle): void;
}
