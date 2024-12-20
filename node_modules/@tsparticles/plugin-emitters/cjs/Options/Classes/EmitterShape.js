"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitterShape = void 0;
const engine_1 = require("@tsparticles/engine");
const EmitterShapeReplace_js_1 = require("./EmitterShapeReplace.js");
class EmitterShape {
    constructor() {
        this.options = {};
        this.replace = new EmitterShapeReplace_js_1.EmitterShapeReplace();
        this.type = "square";
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.options !== undefined) {
            this.options = (0, engine_1.deepExtend)({}, data.options ?? {});
        }
        this.replace.load(data.replace);
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
exports.EmitterShape = EmitterShape;
