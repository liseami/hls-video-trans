import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IZIndex } from "../../../Interfaces/Particles/ZIndex/IZIndex.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { ValueWithRandom } from "../../ValueWithRandom.js";
export declare class ZIndex extends ValueWithRandom implements IZIndex, IOptionLoader<IZIndex> {
    opacityRate: number;
    sizeRate: number;
    velocityRate: number;
    constructor();
    load(data?: RecursivePartial<IZIndex>): void;
}
