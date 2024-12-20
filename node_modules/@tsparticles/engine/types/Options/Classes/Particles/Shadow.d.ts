import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { IShadow } from "../../Interfaces/Particles/IShadow.js";
import { OptionsColor } from "../OptionsColor.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
export declare class Shadow implements IShadow, IOptionLoader<IShadow> {
    blur: number;
    color: OptionsColor;
    enable: boolean;
    offset: ICoordinates;
    constructor();
    load(data?: RecursivePartial<IShadow>): void;
}
