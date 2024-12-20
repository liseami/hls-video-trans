import { Engine } from "./Core/Engine";
import { HslColorManager } from "./Utils/HslColorManager";
import { RgbColorManager } from "./Utils/RgbColorManager";
import { addColorManager } from "./Utils/ColorUtils";
export function init() {
    const rgbColorManager = new RgbColorManager(), hslColorManager = new HslColorManager();
    addColorManager(rgbColorManager);
    addColorManager(hslColorManager);
    const engine = new Engine();
    engine.init();
    return engine;
}
