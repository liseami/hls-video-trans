(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InteractionManager = void 0;
    class InteractionManager {
        constructor(engine, container) {
            this.container = container;
            this._engine = engine;
            this._interactors = engine.plugins.getInteractors(this.container, true);
            this._externalInteractors = [];
            this._particleInteractors = [];
        }
        async externalInteract(delta) {
            for (const interactor of this._externalInteractors) {
                interactor.isEnabled() && (await interactor.interact(delta));
            }
        }
        handleClickMode(mode) {
            for (const interactor of this._externalInteractors) {
                interactor.handleClickMode && interactor.handleClickMode(mode);
            }
        }
        init() {
            this._externalInteractors = [];
            this._particleInteractors = [];
            for (const interactor of this._interactors) {
                switch (interactor.type) {
                    case "external":
                        this._externalInteractors.push(interactor);
                        break;
                    case "particles":
                        this._particleInteractors.push(interactor);
                        break;
                }
                interactor.init();
            }
        }
        async particlesInteract(particle, delta) {
            for (const interactor of this._externalInteractors) {
                interactor.clear(particle, delta);
            }
            for (const interactor of this._particleInteractors) {
                interactor.isEnabled(particle) && (await interactor.interact(particle, delta));
            }
        }
        async reset(particle) {
            for (const interactor of this._externalInteractors) {
                interactor.isEnabled() && interactor.reset(particle);
            }
            for (const interactor of this._particleInteractors) {
                interactor.isEnabled(particle) && interactor.reset(particle);
            }
        }
    }
    exports.InteractionManager = InteractionManager;
});
