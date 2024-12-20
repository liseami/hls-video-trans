"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionsAbsorb = void 0;
class CollisionsAbsorb {
    constructor() {
        this.speed = 2;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}
exports.CollisionsAbsorb = CollisionsAbsorb;
