import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { IShadow } from "../../Interfaces/Particles/IShadow";
import { OptionsColor } from "../OptionsColor";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Shadow implements IShadow, IOptionLoader<IShadow> {
    blur: number;
    color: OptionsColor;
    enable: boolean;
    offset: ICoordinates;
    constructor();
    load(data?: RecursivePartial<IShadow>): void;
}
