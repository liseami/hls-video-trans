import type { IMoveGravity } from "../../../Interfaces/Particles/Move/IMoveGravity.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class MoveGravity implements IMoveGravity, IOptionLoader<IMoveGravity> {
    acceleration: RangeValue;
    enable: boolean;
    inverse: boolean;
    maxSpeed: RangeValue;
    constructor();
    load(data?: RecursivePartial<IMoveGravity>): void;
}
