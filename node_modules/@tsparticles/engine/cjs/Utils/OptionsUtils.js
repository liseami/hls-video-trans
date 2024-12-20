"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadOptions = loadOptions;
exports.loadParticlesOptions = loadParticlesOptions;
const ParticlesOptions_js_1 = require("../Options/Classes/Particles/ParticlesOptions.js");
function loadOptions(options, ...sourceOptionsArr) {
    for (const sourceOptions of sourceOptionsArr) {
        options.load(sourceOptions);
    }
}
function loadParticlesOptions(engine, container, ...sourceOptionsArr) {
    const options = new ParticlesOptions_js_1.ParticlesOptions(engine, container);
    loadOptions(options, ...sourceOptionsArr);
    return options;
}
