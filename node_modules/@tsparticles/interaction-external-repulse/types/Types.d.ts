import type { Container, Particle } from "@tsparticles/engine";
import type { IRepulse } from "./Options/Interfaces/IRepulse.js";
import type { Repulse } from "./Options/Classes/Repulse.js";
import type { RepulseOptions } from "./Options/Classes/RepulseOptions.js";
export interface IRepulseMode {
    repulse: IRepulse;
}
export interface RepulseMode {
    repulse?: Repulse;
}
interface IContainerRepulse {
    clicking?: boolean;
    count?: number;
    finish?: boolean;
    particles: Particle[];
}
export type RepulseContainer = Container & {
    actualOptions: RepulseOptions;
    repulse?: IContainerRepulse;
    retina: {
        repulseModeDistance?: number;
    };
};
export {};
