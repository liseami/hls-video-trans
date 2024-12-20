import type { ICoordinatesWithMode } from "../../../../Core/Interfaces/ICoordinates";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ISpin } from "../../../Interfaces/Particles/Move/ISpin";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Spin implements ISpin, IOptionLoader<ISpin> {
    acceleration: RangeValue;
    enable: boolean;
    position?: ICoordinatesWithMode;
    constructor();
    load(data?: RecursivePartial<ISpin>): void;
}
