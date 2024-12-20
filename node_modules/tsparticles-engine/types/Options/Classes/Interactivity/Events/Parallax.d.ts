import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IParallax } from "../../../Interfaces/Interactivity/Events/IParallax";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Parallax implements IParallax, IOptionLoader<IParallax> {
    enable: boolean;
    force: number;
    smooth: number;
    constructor();
    load(data?: RecursivePartial<IParallax>): void;
}
