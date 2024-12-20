import type { IFullScreen } from "../../Interfaces/FullScreen/IFullScreen.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
export declare class FullScreen implements IFullScreen, IOptionLoader<IFullScreen> {
    enable: boolean;
    zIndex: number;
    constructor();
    load(data?: RecursivePartial<IFullScreen>): void;
}
