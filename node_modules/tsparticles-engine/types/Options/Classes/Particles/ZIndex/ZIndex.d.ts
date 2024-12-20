import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IZIndex } from "../../../Interfaces/Particles/ZIndex/IZIndex";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { ValueWithRandom } from "../../ValueWithRandom";
export declare class ZIndex extends ValueWithRandom implements IZIndex, IOptionLoader<IZIndex> {
    opacityRate: number;
    sizeRate: number;
    velocityRate: number;
    constructor();
    load(data?: RecursivePartial<IZIndex>): void;
}
