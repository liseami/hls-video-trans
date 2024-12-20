"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modes = void 0;
class Modes {
    constructor(engine, container) {
        this._engine = engine;
        this._container = container;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (!this._container) {
            return;
        }
        const interactors = this._engine.plugins.interactors.get(this._container);
        if (!interactors) {
            return;
        }
        for (const interactor of interactors) {
            if (!interactor.loadModeOptions) {
                continue;
            }
            interactor.loadModeOptions(this, data);
        }
    }
}
exports.Modes = Modes;
