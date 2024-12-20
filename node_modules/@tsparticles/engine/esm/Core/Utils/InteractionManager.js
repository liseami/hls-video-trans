import { InteractorType } from "../../Enums/Types/InteractorType.js";
export class InteractionManager {
    constructor(engine, container) {
        this.container = container;
        this._engine = engine;
        this._interactors = [];
        this._externalInteractors = [];
        this._particleInteractors = [];
    }
    externalInteract(delta) {
        for (const interactor of this._externalInteractors) {
            if (interactor.isEnabled()) {
                interactor.interact(delta);
            }
        }
    }
    handleClickMode(mode) {
        for (const interactor of this._externalInteractors) {
            interactor.handleClickMode?.(mode);
        }
    }
    async init() {
        this._interactors = await this._engine.getInteractors(this.container, true);
        this._externalInteractors = [];
        this._particleInteractors = [];
        for (const interactor of this._interactors) {
            switch (interactor.type) {
                case InteractorType.external:
                    this._externalInteractors.push(interactor);
                    break;
                case InteractorType.particles:
                    this._particleInteractors.push(interactor);
                    break;
            }
            interactor.init();
        }
    }
    particlesInteract(particle, delta) {
        for (const interactor of this._externalInteractors) {
            interactor.clear(particle, delta);
        }
        for (const interactor of this._particleInteractors) {
            if (interactor.isEnabled(particle)) {
                interactor.interact(particle, delta);
            }
        }
    }
    reset(particle) {
        for (const interactor of this._externalInteractors) {
            if (interactor.isEnabled()) {
                interactor.reset(particle);
            }
        }
        for (const interactor of this._particleInteractors) {
            if (interactor.isEnabled(particle)) {
                interactor.reset(particle);
            }
        }
    }
}
