import type { Container } from "../Container";
import type { IDelta } from "./IDelta";
import type { IParticleColorStyle } from "./IParticleColorStyle";
import type { IParticleTransformValues } from "./IParticleTransformValues";
import type { IShadow } from "../../Options/Interfaces/Particles/IShadow";
import type { Particle } from "../Particle";
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
