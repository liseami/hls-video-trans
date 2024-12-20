import { type IOptionLoader, type RecursivePartial, RotateDirection, type RotateDirectionAlt, ValueWithRandom } from "@tsparticles/engine";
import type { IRotate } from "../Interfaces/IRotate.js";
import { RotateAnimation } from "./RotateAnimation.js";
export declare class Rotate extends ValueWithRandom implements IRotate, IOptionLoader<IRotate> {
    animation: RotateAnimation;
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    path: boolean;
    constructor();
    load(data?: RecursivePartial<IRotate>): void;
}
