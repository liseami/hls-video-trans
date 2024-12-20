"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const Engine_1 = require("./Core/Engine");
const HslColorManager_1 = require("./Utils/HslColorManager");
const RgbColorManager_1 = require("./Utils/RgbColorManager");
const ColorUtils_1 = require("./Utils/ColorUtils");
function init() {
    const rgbColorManager = new RgbColorManager_1.RgbColorManager(), hslColorManager = new HslColorManager_1.HslColorManager();
    (0, ColorUtils_1.addColorManager)(rgbColorManager);
    (0, ColorUtils_1.addColorManager)(hslColorManager);
    const engine = new Engine_1.Engine();
    engine.init();
    return engine;
}
exports.init = init;
