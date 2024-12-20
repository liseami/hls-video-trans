"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const Engine_js_1 = require("./Core/Engine.js");
function init() {
    const engine = new Engine_js_1.Engine();
    engine.init();
    return engine;
}
