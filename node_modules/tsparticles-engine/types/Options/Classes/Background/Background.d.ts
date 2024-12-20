import type { IBackground } from "../../Interfaces/Background/IBackground";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { OptionsColor } from "../OptionsColor";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
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
