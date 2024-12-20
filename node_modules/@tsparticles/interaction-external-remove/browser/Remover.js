import { ExternalInteractorBase, getRangeValue, } from "@tsparticles/engine";
import { Remove } from "./Options/Classes/Remove.js";
const removeMode = "remove";
export class Remover extends ExternalInteractorBase {
    constructor(container) {
        super(container);
        this.handleClickMode = (mode) => {
            const container = this.container, options = container.actualOptions;
            if (!options.interactivity.modes.remove || mode !== removeMode) {
                return;
            }
            const removeNb = getRangeValue(options.interactivity.modes.remove.quantity);
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
            options.remove = new Remove();
        }
        for (const source of sources) {
            options.remove.load(source?.remove);
        }
    }
    reset() {
    }
}
