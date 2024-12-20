import type { IMoveCenter } from "../../../Interfaces/Particles/Move/IMoveCenter";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { PixelMode } from "../../../../Enums/Modes/PixelMode";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class MoveCenter implements IMoveCenter, IOptionLoader<IMoveCenter> {
    mode: PixelMode | keyof typeof PixelMode;
    radius: number;
    x: number;
    y: number;
    constructor();
    load(data?: RecursivePartial<IMoveCenter>): void;
}
