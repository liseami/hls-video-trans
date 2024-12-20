import { BackgroundMaskCover } from "./BackgroundMaskCover";
import type { IBackgroundMask } from "../../Interfaces/BackgroundMask/IBackgroundMask";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class BackgroundMask implements IBackgroundMask, IOptionLoader<IBackgroundMask> {
    composite: GlobalCompositeOperation;
    cover: BackgroundMaskCover;
    enable: boolean;
    constructor();
    load(data?: RecursivePartial<IBackgroundMask>): void;
}
