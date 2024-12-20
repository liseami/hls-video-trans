"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizeEvent = void 0;
class ResizeEvent {
    constructor() {
        this.delay = 0.5;
        this.enable = true;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.delay !== undefined) {
            this.delay = data.delay;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
exports.ResizeEvent = ResizeEvent;
