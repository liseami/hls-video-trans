import type { IAnimatableColor, IParticlesOptions, IRangedCoordinates, MoveDirection, MoveDirectionAlt, RecursivePartial, SingleOrMultiple } from "@tsparticles/engine";
import type { IEmitterLife } from "./IEmitterLife.js";
import type { IEmitterRate } from "./IEmitterRate.js";
import type { IEmitterShape } from "./IEmitterShape.js";
import type { IEmitterSize } from "./IEmitterSize.js";
export interface IEmitter {
    autoPlay: boolean;
    direction?: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;
    domId?: string;
    fill: boolean;
    life: IEmitterLife;
    name?: string;
    particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
    position?: RecursivePartial<IRangedCoordinates>;
    rate: IEmitterRate;
    shape: IEmitterShape;
    size?: IEmitterSize;
    spawnColor?: IAnimatableColor;
    startCount: number;
}
