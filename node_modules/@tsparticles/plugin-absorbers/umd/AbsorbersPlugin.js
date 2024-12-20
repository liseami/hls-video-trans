(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./Options/Classes/Absorber.js", "./Enums/AbsorberClickMode.js", "./Absorbers.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbsorbersPlugin = void 0;
    const engine_1 = require("@tsparticles/engine");
    const Absorber_js_1 = require("./Options/Classes/Absorber.js");
    const AbsorberClickMode_js_1 = require("./Enums/AbsorberClickMode.js");
    const Absorbers_js_1 = require("./Absorbers.js");
    class AbsorbersPlugin {
        constructor(engine) {
            this.id = "absorbers";
            this._engine = engine;
        }
        async getPlugin(container) {
            return Promise.resolve(new Absorbers_js_1.Absorbers(container, this._engine));
        }
        loadOptions(options, source) {
            if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
                return;
            }
            if (source?.absorbers) {
                options.absorbers = (0, engine_1.executeOnSingleOrMultiple)(source.absorbers, absorber => {
                    const tmp = new Absorber_js_1.Absorber();
                    tmp.load(absorber);
                    return tmp;
                });
            }
            options.interactivity.modes.absorbers = (0, engine_1.executeOnSingleOrMultiple)(source?.interactivity?.modes?.absorbers, absorber => {
                const tmp = new Absorber_js_1.Absorber();
                tmp.load(absorber);
                return tmp;
            });
        }
        needsPlugin(options) {
            if (!options) {
                return false;
            }
            const absorbers = options.absorbers;
            if ((0, engine_1.isArray)(absorbers)) {
                return !!absorbers.length;
            }
            else if (absorbers) {
                return true;
            }
            else if (options.interactivity?.events?.onClick?.mode &&
                (0, engine_1.isInArray)(AbsorberClickMode_js_1.AbsorberClickMode.absorber, options.interactivity.events.onClick.mode)) {
                return true;
            }
            return false;
        }
    }
    exports.AbsorbersPlugin = AbsorbersPlugin;
});
