import { type IOptionLoader, type RangeValue, type RecursivePartial } from "@tsparticles/engine";
import type { IWobble } from "../Interfaces/IWobble.js";
import { WobbleSpeed } from "./WobbleSpeed.js";
export declare class Wobble implements IWobble, IOptionLoader<IWobble> {
    distance: RangeValue;
    enable: boolean;
    speed: WobbleSpeed;
    constructor();
    load(data?: RecursivePartial<IWobble>): void;
}
