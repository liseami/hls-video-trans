import { EmitterShapeBase, type IRandomPositionData } from "@tsparticles/plugin-emitters";
import { type ICoordinates, type IDimension } from "@tsparticles/engine";
export declare class EmittersCircleShape extends EmitterShapeBase {
    constructor(position: ICoordinates, size: IDimension, fill: boolean, options: unknown);
    init(): Promise<void>;
    randomPosition(): IRandomPositionData;
}
