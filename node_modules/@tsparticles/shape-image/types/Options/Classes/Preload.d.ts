import { type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import type { IPreload } from "../Interfaces/IPreload.js";
export declare class Preload implements IPreload, IOptionLoader<IPreload> {
    gif: boolean;
    height?: number;
    name?: string | undefined;
    replaceColor?: boolean | undefined;
    src: string;
    width?: number;
    constructor();
    load(data?: RecursivePartial<IPreload>): void;
}
