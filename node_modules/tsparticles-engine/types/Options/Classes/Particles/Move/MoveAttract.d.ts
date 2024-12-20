import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { IMoveAttract } from "../../../Interfaces/Particles/Move/IMoveAttract";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class MoveAttract implements IMoveAttract, IOptionLoader<IMoveAttract> {
    distance: RangeValue;
    enable: boolean;
    rotate: ICoordinates;
    constructor();
    get rotateX(): number;
    set rotateX(value: number);
    get rotateY(): number;
    set rotateY(value: number);
    load(data?: RecursivePartial<IMoveAttract>): void;
}
