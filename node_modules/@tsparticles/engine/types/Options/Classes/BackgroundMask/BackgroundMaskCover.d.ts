import type { IBackgroundMaskCover } from "../../Interfaces/BackgroundMask/IBackgroundMaskCover.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import { OptionsColor } from "../OptionsColor.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
export declare class BackgroundMaskCover implements IBackgroundMaskCover, IOptionLoader<IBackgroundMaskCover> {
    color?: OptionsColor;
    image?: string;
    opacity: number;
    constructor();
    load(data?: RecursivePartial<IBackgroundMaskCover> | undefined): void;
}
