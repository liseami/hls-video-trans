import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IRandom } from "../Interfaces/IRandom";
import type { RecursivePartial } from "../../Types/RecursivePartial";
export declare class Random implements IRandom, IOptionLoader<IRandom> {
    enable: boolean;
    minimumValue: number;
    constructor();
    load(data?: RecursivePartial<IRandom>): void;
}
