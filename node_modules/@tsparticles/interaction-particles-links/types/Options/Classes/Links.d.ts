import { type IOptionLoader, OptionsColor, type RecursivePartial } from "@tsparticles/engine";
import type { ILinks } from "../Interfaces/ILinks.js";
import { LinksShadow } from "./LinksShadow.js";
import { LinksTriangle } from "./LinksTriangle.js";
export declare class Links implements ILinks, IOptionLoader<ILinks> {
    blink: boolean;
    color: OptionsColor;
    consent: boolean;
    distance: number;
    enable: boolean;
    frequency: number;
    id?: string;
    opacity: number;
    shadow: LinksShadow;
    triangles: LinksTriangle;
    warp: boolean;
    width: number;
    constructor();
    load(data?: RecursivePartial<ILinks>): void;
}
