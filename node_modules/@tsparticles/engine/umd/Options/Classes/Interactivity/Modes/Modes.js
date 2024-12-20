(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Modes = void 0;
    const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
    class Modes {
        constructor(engine, container) {
            this._engine = engine;
            this._container = container;
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
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
    exports.Modes = Modes;
});
