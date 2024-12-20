import type { IMoveGravity } from "../../../Interfaces/Particles/Move/IMoveGravity";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class MoveGravity implements IMoveGravity, IOptionLoader<IMoveGravity> {
    acceleration: RangeValue;
    enable: boolean;
    inverse: boolean;
    maxSpeed: RangeValue;
    constructor();
    load(data?: RecursivePartial<IMoveGravity>): void;
}
