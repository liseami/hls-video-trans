import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ISize } from "../../../Interfaces/Particles/Size/ISize";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { SizeAnimation } from "./SizeAnimation";
import { ValueWithRandom } from "../../ValueWithRandom";
export declare class Size extends ValueWithRandom implements ISize, IOptionLoader<ISize> {
    animation: SizeAnimation;
    constructor();
    get anim(): SizeAnimation;
    set anim(value: SizeAnimation);
    load(data?: RecursivePartial<ISize>): void;
}
