import { type IOptionLoader, OptionsColor, type RecursivePartial } from "@tsparticles/engine";
import type { ILinksShadow } from "../Interfaces/ILinksShadow.js";
export declare class LinksShadow implements ILinksShadow, IOptionLoader<ILinksShadow> {
    blur: number;
    color: OptionsColor;
    enable: boolean;
    constructor();
    load(data?: RecursivePartial<ILinksShadow>): void;
}
