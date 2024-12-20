import type { IMoveAngle } from "../../../Interfaces/Particles/Move/IMoveAngle";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class MoveAngle implements IMoveAngle, IOptionLoader<IMoveAngle> {
    offset: RangeValue;
    value: RangeValue;
    constructor();
    load(data?: RecursivePartial<IMoveAngle>): void;
}
