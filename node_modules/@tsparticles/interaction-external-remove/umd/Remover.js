(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./Options/Classes/Remove.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Remover = void 0;
    const engine_1 = require("@tsparticles/engine");
    const Remove_js_1 = require("./Options/Classes/Remove.js");
    const removeMode = "remove";
    class Remover extends engine_1.ExternalInteractorBase {
        constructor(container) {
            super(container);
            this.handleClickMode = (mode) => {
                const container = this.container, options = container.actualOptions;
                if (!options.interactivity.modes.remove || mode !== removeMode) {
                    return;
                }
                const removeNb = (0, engine_1.getRangeValue)(options.interactivity.modes.remove.quantity);
                container.particles.removeQuantity(removeNb);
            };
        }
        clear() {
        }
        init() {
        }
        interact() {
        }
        isEnabled() {
            return true;
        }
        loadModeOptions(options, ...sources) {
            if (!options.remove) {
                options.remove = new Remove_js_1.Remove();
            }
            for (const source of sources) {
                options.remove.load(source?.remove);
            }
        }
        reset() {
        }
    }
    exports.Remover = Remover;
});
