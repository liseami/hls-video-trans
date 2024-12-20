import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
export function loadOptions(options, ...sourceOptionsArr) {
    for (const sourceOptions of sourceOptionsArr) {
        options.load(sourceOptions);
    }
}
export function loadParticlesOptions(engine, container, ...sourceOptionsArr) {
    const options = new ParticlesOptions(engine, container);
    loadOptions(options, ...sourceOptionsArr);
    return options;
}
