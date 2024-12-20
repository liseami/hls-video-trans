import { Engine } from "./Core/Engine.js";
export function init() {
    const engine = new Engine();
    engine.init();
    return engine;
}
