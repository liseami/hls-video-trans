import type { IParticlesOptions, Particle, ParticlesOptions } from "@tsparticles/engine";
import type { IWobble } from "./Options/Interfaces/IWobble.js";
import type { Wobble } from "./Options/Classes/Wobble.js";
interface IParticleWobble {
    angle: number;
    angleSpeed: number;
    moveSpeed: number;
}
export type WobbleParticle = Particle & {
    options: WobbleParticlesOptions;
    retina: {
        wobbleDistance?: number;
    };
    wobble?: IParticleWobble;
};
export type IWobbleParticlesOptions = IParticlesOptions & {
    wobble?: IWobble;
};
export type WobbleParticlesOptions = ParticlesOptions & {
    wobble?: Wobble;
};
export {};
