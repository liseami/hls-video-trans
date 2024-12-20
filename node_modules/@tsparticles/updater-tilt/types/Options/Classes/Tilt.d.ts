import { type IOptionLoader, type RecursivePartial, ValueWithRandom } from "@tsparticles/engine";
import { TiltDirection, type TiltDirectionAlt } from "../../TiltDirection.js";
import type { ITilt } from "../Interfaces/ITilt.js";
import { TiltAnimation } from "./TiltAnimation.js";
export declare class Tilt extends ValueWithRandom implements ITilt, IOptionLoader<ITilt> {
    animation: TiltAnimation;
    direction: TiltDirection | keyof typeof TiltDirection | TiltDirectionAlt;
    enable: boolean;
    constructor();
    load(data?: RecursivePartial<ITilt>): void;
}
