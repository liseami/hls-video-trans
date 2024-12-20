import type { IMoveAngle } from "../../../Interfaces/Particles/Move/IMoveAngle.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class MoveAngle implements IMoveAngle, IOptionLoader<IMoveAngle> {
    offset: RangeValue;
    value: RangeValue;
    constructor();
    load(data?: RecursivePartial<IMoveAngle>): void;
}
