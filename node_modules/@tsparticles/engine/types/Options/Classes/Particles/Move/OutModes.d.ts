import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IOutModes } from "../../../Interfaces/Particles/Move/IOutModes.js";
import { OutMode } from "../../../../Enums/Modes/OutMode.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class OutModes implements IOutModes, IOptionLoader<IOutModes> {
    bottom?: OutMode | keyof typeof OutMode;
    default: OutMode | keyof typeof OutMode;
    left?: OutMode | keyof typeof OutMode;
    right?: OutMode | keyof typeof OutMode;
    top?: OutMode | keyof typeof OutMode;
    constructor();
    load(data?: RecursivePartial<IOutModes>): void;
}
