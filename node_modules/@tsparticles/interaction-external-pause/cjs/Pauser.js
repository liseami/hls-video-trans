"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pauser = void 0;
const engine_1 = require("@tsparticles/engine");
const pauseMode = "pause";
class Pauser extends engine_1.ExternalInteractorBase {
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
exports.Pauser = Pauser;
