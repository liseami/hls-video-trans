import { type IOptionLoader, OptionsColor, type RecursivePartial } from "@tsparticles/engine";
import type { ILinksTriangle } from "../Interfaces/ILinksTriangle.js";
export declare class LinksTriangle implements ILinksTriangle, IOptionLoader<ILinksTriangle> {
    color?: OptionsColor;
    enable: boolean;
    frequency: number;
    opacity?: number;
    constructor();
    load(data?: RecursivePartial<ILinksTriangle>): void;
}
