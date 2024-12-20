"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadParticlesOptions = exports.loadOptions = void 0;
const ParticlesOptions_1 = require("../Options/Classes/Particles/ParticlesOptions");
function loadOptions(options, ...sourceOptionsArr) {
    for (const sourceOptions of sourceOptionsArr) {
        options.load(sourceOptions);
    }
}
exports.loadOptions = loadOptions;
function loadParticlesOptions(engine, container, ...sourceOptionsArr) {
    const options = new ParticlesOptions_1.ParticlesOptions(engine, container);
    loadOptions(options, ...sourceOptionsArr);
    return options;
}
exports.loadParticlesOptions = loadParticlesOptions;
