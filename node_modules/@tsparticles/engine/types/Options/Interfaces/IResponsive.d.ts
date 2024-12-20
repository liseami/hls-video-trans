import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { ResponsiveMode } from "../../Enums/Modes/ResponsiveMode.js";
export interface IResponsive {
    maxWidth: number;
    mode: ResponsiveMode | keyof typeof ResponsiveMode;
    options: ISourceOptions;
}
