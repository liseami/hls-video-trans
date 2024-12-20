import type { IMoveCenter } from "../../../Interfaces/Particles/Move/IMoveCenter.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import { PixelMode } from "../../../../Enums/Modes/PixelMode.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class MoveCenter implements IMoveCenter, IOptionLoader<IMoveCenter> {
    mode: PixelMode | keyof typeof PixelMode;
    radius: number;
    x: number;
    y: number;
    constructor();
    load(data?: RecursivePartial<IMoveCenter>): void;
}
