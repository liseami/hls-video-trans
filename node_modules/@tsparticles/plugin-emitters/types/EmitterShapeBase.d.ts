import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape } from "./IEmitterShape.js";
import type { IRandomPositionData } from "./IRandomPositionData.js";
export declare abstract class EmitterShapeBase<TOptions = unknown> implements IEmitterShape {
    fill: boolean;
    options: TOptions;
    position: ICoordinates;
    size: IDimension;
    protected constructor(position: ICoordinates, size: IDimension, fill: boolean, options: TOptions);
    resize(position: ICoordinates, size: IDimension): void;
    abstract init(): Promise<void>;
    abstract randomPosition(): IRandomPositionData | null;
}
