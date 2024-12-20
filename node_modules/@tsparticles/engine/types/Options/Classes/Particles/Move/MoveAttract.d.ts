import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates.js";
import type { IMoveAttract } from "../../../Interfaces/Particles/Move/IMoveAttract.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class MoveAttract implements IMoveAttract, IOptionLoader<IMoveAttract> {
    distance: RangeValue;
    enable: boolean;
    rotate: ICoordinates;
    constructor();
    load(data?: RecursivePartial<IMoveAttract>): void;
}
