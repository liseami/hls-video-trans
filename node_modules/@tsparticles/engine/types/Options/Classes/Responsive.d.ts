import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { IResponsive } from "../Interfaces/IResponsive.js";
import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { ResponsiveMode } from "../../Enums/Modes/ResponsiveMode.js";
export declare class Responsive implements IResponsive, IOptionLoader<IResponsive> {
    maxWidth: number;
    mode: ResponsiveMode | keyof typeof ResponsiveMode;
    options: ISourceOptions;
    constructor();
    load(data?: RecursivePartial<IResponsive>): void;
}
