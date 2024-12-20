import { type Container, type IDelta, type IParticleNumericValueAnimation, type IParticleUpdater, type IParticlesOptions, type Particle, type ParticlesOptions, type RecursivePartial } from "@tsparticles/engine";
import type { IRotate } from "./Options/Interfaces/IRotate.js";
import { Rotate } from "./Options/Classes/Rotate.js";
type RotateParticle = Particle & {
    options: RotateParticlesOptions;
    rotate?: IParticleNumericValueAnimation;
};
type IRotateParticlesOptions = IParticlesOptions & {
    rotate?: IRotate;
};
type RotateParticlesOptions = ParticlesOptions & {
    rotate?: Rotate;
};
export declare class RotateUpdater implements IParticleUpdater {
    private readonly container;
    constructor(container: Container);
    init(particle: RotateParticle): void;
    isEnabled(particle: RotateParticle): boolean;
    loadOptions(options: RotateParticlesOptions, ...sources: (RecursivePartial<IRotateParticlesOptions> | undefined)[]): void;
    update(particle: RotateParticle, delta: IDelta): void;
}
export {};
