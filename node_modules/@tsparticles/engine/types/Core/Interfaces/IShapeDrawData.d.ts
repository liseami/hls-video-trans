import type { IDelta } from "./IDelta.js";
import type { Particle } from "../Particle.js";
export interface IShapeDrawData<TParticle extends Particle = Particle> {
    context: CanvasRenderingContext2D;
    delta: IDelta;
    opacity: number;
    particle: TParticle;
    pixelRatio: number;
    radius: number;
    transformData: {
        a: number;
        b: number;
        c: number;
        d: number;
    };
}
