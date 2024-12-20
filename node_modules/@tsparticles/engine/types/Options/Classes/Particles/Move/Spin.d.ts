import type { ICoordinatesWithMode } from "../../../../Core/Interfaces/ICoordinates.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { ISpin } from "../../../Interfaces/Particles/Move/ISpin.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class Spin implements ISpin, IOptionLoader<ISpin> {
    acceleration: RangeValue;
    enable: boolean;
    position?: ICoordinatesWithMode;
    constructor();
    load(data?: RecursivePartial<ISpin>): void;
}
