import { isNull } from "../../../../Utils/TypeUtils.js";
export class Modes {
    constructor(engine, container) {
        this._engine = engine;
        this._container = container;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (!this._container) {
            return;
        }
        const interactors = this._engine.interactors.get(this._container);
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
