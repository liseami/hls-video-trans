import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IOptions } from "../Interfaces/IOptions";
import type { IResponsive } from "../Interfaces/IResponsive";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { ResponsiveMode } from "../../Enums/Modes/ResponsiveMode";
export declare class Responsive implements IResponsive, IOptionLoader<IResponsive> {
    maxWidth: number;
    mode: ResponsiveMode | keyof typeof ResponsiveMode;
    options: RecursivePartial<IOptions>;
    constructor();
    load(data?: RecursivePartial<IResponsive>): void;
}
