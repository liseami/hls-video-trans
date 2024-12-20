import { AnimatableColor, type IOptionLoader, type IParticlesOptions, type IRangedCoordinates, type MoveDirection, type MoveDirectionAlt, type RecursivePartial, type SingleOrMultiple } from "@tsparticles/engine";
import { EmitterLife } from "./EmitterLife.js";
import { EmitterRate } from "./EmitterRate.js";
import { EmitterShape } from "./EmitterShape.js";
import { EmitterSize } from "./EmitterSize.js";
import type { IEmitter } from "../Interfaces/IEmitter.js";
export declare class Emitter implements IEmitter, IOptionLoader<IEmitter> {
    autoPlay: boolean;
    direction?: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;
    domId?: string;
    fill: boolean;
    life: EmitterLife;
    name?: string;
    particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
    position?: RecursivePartial<IRangedCoordinates>;
    rate: EmitterRate;
    shape: EmitterShape;
    size?: EmitterSize;
    spawnColor?: AnimatableColor;
    startCount: number;
    constructor();
    load(data?: RecursivePartial<IEmitter>): void;
}
