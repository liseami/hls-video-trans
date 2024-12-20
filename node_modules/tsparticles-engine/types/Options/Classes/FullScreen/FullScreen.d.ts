import type { IFullScreen } from "../../Interfaces/FullScreen/IFullScreen";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class FullScreen implements IFullScreen, IOptionLoader<IFullScreen> {
    enable: boolean;
    zIndex: number;
    constructor();
    load(data?: RecursivePartial<IFullScreen>): void;
}
