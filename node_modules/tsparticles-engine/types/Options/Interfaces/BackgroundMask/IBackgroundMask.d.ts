import type { IBackgroundMaskCover } from "./IBackgroundMaskCover";
import type { IColor } from "../../../Core/Interfaces/Colors";
export interface IBackgroundMask {
    composite: GlobalCompositeOperation;
    cover: IBackgroundMaskCover | IColor | string;
    enable: boolean;
}
