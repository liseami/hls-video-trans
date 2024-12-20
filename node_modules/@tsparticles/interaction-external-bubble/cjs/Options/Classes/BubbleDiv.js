"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BubbleDiv = void 0;
const engine_1 = require("@tsparticles/engine");
const BubbleBase_js_1 = require("./BubbleBase.js");
class BubbleDiv extends BubbleBase_js_1.BubbleBase {
    constructor() {
        super();
        this.selectors = [];
    }
    load(data) {
        super.load(data);
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
    }
}
exports.BubbleDiv = BubbleDiv;
