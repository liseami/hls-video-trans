import type { IBackgroundMaskCover } from "./IBackgroundMaskCover.js";
import type { IColor } from "../../../Core/Interfaces/Colors.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
export interface IBackgroundMask {
    composite: GlobalCompositeOperation;
    cover: RecursivePartial<IBackgroundMaskCover> | IColor | string;
    enable: boolean;
}
