import { ExternalInteractorBase } from "@tsparticles/engine";
const pauseMode = "pause";
export class Pauser extends ExternalInteractorBase {
    constructor(container) {
        super(container);
        this.handleClickMode = (mode) => {
            if (mode !== pauseMode) {
                return;
            }
            const container = this.container;
            if (container.animationStatus) {
                container.pause();
            }
            else {
                container.play();
            }
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
    reset() {
    }
}
