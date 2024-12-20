import { executeOnSingleOrMultiple, isArray, isInArray, } from "@tsparticles/engine";
import { Absorber } from "./Options/Classes/Absorber.js";
import { AbsorberClickMode } from "./Enums/AbsorberClickMode.js";
import { Absorbers } from "./Absorbers.js";
export class AbsorbersPlugin {
    constructor(engine) {
        this.id = "absorbers";
        this._engine = engine;
    }
    async getPlugin(container) {
        return Promise.resolve(new Absorbers(container, this._engine));
    }
    loadOptions(options, source) {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }
        if (source?.absorbers) {
            options.absorbers = executeOnSingleOrMultiple(source.absorbers, absorber => {
                const tmp = new Absorber();
                tmp.load(absorber);
                return tmp;
            });
        }
        options.interactivity.modes.absorbers = executeOnSingleOrMultiple(source?.interactivity?.modes?.absorbers, absorber => {
            const tmp = new Absorber();
            tmp.load(absorber);
            return tmp;
        });
    }
    needsPlugin(options) {
        if (!options) {
            return false;
        }
        const absorbers = options.absorbers;
        if (isArray(absorbers)) {
            return !!absorbers.length;
        }
        else if (absorbers) {
            return true;
        }
        else if (options.interactivity?.events?.onClick?.mode &&
            isInArray(AbsorberClickMode.absorber, options.interactivity.events.onClick.mode)) {
            return true;
        }
        return false;
    }
}
