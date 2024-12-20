import { type IOptionLoader, PixelMode, type RecursivePartial } from "@tsparticles/engine";
import type { IEmitterSize } from "../Interfaces/IEmitterSize.js";
export declare class EmitterSize implements IEmitterSize, IOptionLoader<IEmitterSize> {
    height: number;
    mode: PixelMode | keyof typeof PixelMode;
    width: number;
    constructor();
    load(data?: RecursivePartial<IEmitterSize>): void;
}
