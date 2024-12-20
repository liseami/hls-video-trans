import { type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import type { IEmitterShapeReplace } from "../Interfaces/IEmitterShapeReplace.js";
export declare class EmitterShapeReplace implements IEmitterShapeReplace, IOptionLoader<IEmitterShapeReplace> {
    color: boolean;
    opacity: boolean;
    constructor();
    load(data?: RecursivePartial<IEmitterShapeReplace> | undefined): void;
}
