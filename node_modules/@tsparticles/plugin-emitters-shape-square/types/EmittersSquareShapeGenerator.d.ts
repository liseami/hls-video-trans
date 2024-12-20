import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape, IEmitterShapeGenerator } from "@tsparticles/plugin-emitters";
export declare class EmittersSquareShapeGenerator implements IEmitterShapeGenerator {
    generate(position: ICoordinates, size: IDimension, fill: boolean, options: unknown): IEmitterShape;
}
