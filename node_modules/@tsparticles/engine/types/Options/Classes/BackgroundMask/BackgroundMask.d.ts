import { BackgroundMaskCover } from "./BackgroundMaskCover.js";
import type { IBackgroundMask } from "../../Interfaces/BackgroundMask/IBackgroundMask.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
export declare class BackgroundMask implements IBackgroundMask, IOptionLoader<IBackgroundMask> {
    composite: GlobalCompositeOperation;
    readonly cover: BackgroundMaskCover;
    enable: boolean;
    constructor();
    load(data?: RecursivePartial<IBackgroundMask>): void;
}
