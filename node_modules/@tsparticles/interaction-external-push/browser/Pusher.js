import { ExternalInteractorBase, getRangeValue, itemFromArray, } from "@tsparticles/engine";
import { Push } from "./Options/Classes/Push.js";
const pushMode = "push", minQuantity = 0;
export class Pusher extends ExternalInteractorBase {
    constructor(container) {
        super(container);
        this.handleClickMode = (mode) => {
            if (mode !== pushMode) {
                return;
            }
            const container = this.container, options = container.actualOptions, pushOptions = options.interactivity.modes.push;
            if (!pushOptions) {
                return;
            }
            const quantity = getRangeValue(pushOptions.quantity);
            if (quantity <= minQuantity) {
                return;
            }
            const group = itemFromArray([undefined, ...pushOptions.groups]), groupOptions = group !== undefined ? container.actualOptions.particles.groups[group] : undefined;
            void container.particles.push(quantity, container.interactivity.mouse, groupOptions, group);
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
        if (!options.push) {
            options.push = new Push();
        }
        for (const source of sources) {
            options.push.load(source?.push);
        }
    }
    reset() {
    }
}
