import type { Container } from "../Container.js";
import type { IDelta } from "./IDelta.js";
import type { IParticleColorStyle } from "./IParticleColorStyle.js";
import type { IParticleTransformValues } from "./IParticleTransformValues.js";
import type { IShadow } from "../../Options/Interfaces/Particles/IShadow.js";
import type { Particle } from "../Particle.js";
export interface IDrawParticleParams {
    backgroundMask: boolean;
    colorStyles: IParticleColorStyle;
    composite: GlobalCompositeOperation;
    container: Container;
    context: CanvasRenderingContext2D;
    delta: IDelta;
    opacity: number;
    particle: Particle;
    radius: number;
    shadow: IShadow;
    transform: IParticleTransformValues;
}
