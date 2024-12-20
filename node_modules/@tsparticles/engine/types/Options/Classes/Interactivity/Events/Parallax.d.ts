import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IParallax } from "../../../Interfaces/Interactivity/Events/IParallax.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class Parallax implements IParallax, IOptionLoader<IParallax> {
    enable: boolean;
    force: number;
    smooth: number;
    constructor();
    load(data?: RecursivePartial<IParallax>): void;
}
