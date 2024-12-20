import type { IBackground } from "../../Interfaces/Background/IBackground.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import { OptionsColor } from "../OptionsColor.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
export declare class Background implements IBackground, IOptionLoader<IBackground> {
    color: OptionsColor;
    image: string;
    opacity: number;
    position: string;
    repeat: string;
    size: string;
    constructor();
    load(data?: RecursivePartial<IBackground>): void;
}
