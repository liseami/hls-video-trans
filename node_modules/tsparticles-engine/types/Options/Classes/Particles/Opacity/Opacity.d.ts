import type { IOpacity } from "../../../Interfaces/Particles/Opacity/IOpacity";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OpacityAnimation } from "./OpacityAnimation";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { ValueWithRandom } from "../../ValueWithRandom";
export declare class Opacity extends ValueWithRandom implements IOpacity, IOptionLoader<IOpacity> {
    animation: OpacityAnimation;
    constructor();
    get anim(): OpacityAnimation;
    set anim(value: OpacityAnimation);
    load(data?: RecursivePartial<IOpacity>): void;
}
