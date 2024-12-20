import type { IValueWithRandom, RotateDirection, RotateDirectionAlt } from "@tsparticles/engine";
import type { IRotateAnimation } from "./IRotateAnimation.js";
export interface IRotate extends IValueWithRandom {
    animation: IRotateAnimation;
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    path: boolean;
}
