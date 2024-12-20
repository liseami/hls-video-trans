import { type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import { EmitterShapeReplace } from "./EmitterShapeReplace.js";
import type { IEmitterShape } from "../Interfaces/IEmitterShape.js";
export declare class EmitterShape implements IEmitterShape, IOptionLoader<IEmitterShape> {
    options: Record<string, unknown>;
    replace: EmitterShapeReplace;
    type: string;
    constructor();
    load(data?: RecursivePartial<IEmitterShape> | undefined): void;
}
