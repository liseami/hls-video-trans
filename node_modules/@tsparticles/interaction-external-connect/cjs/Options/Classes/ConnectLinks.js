"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectLinks = void 0;
const engine_1 = require("@tsparticles/engine");
class ConnectLinks {
    constructor() {
        this.opacity = 0.5;
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
exports.ConnectLinks = ConnectLinks;
