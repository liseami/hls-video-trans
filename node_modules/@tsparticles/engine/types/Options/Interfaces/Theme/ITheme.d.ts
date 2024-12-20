import type { ISourceOptions } from "../../../Types/ISourceOptions.js";
import type { IThemeDefault } from "./IThemeDefault.js";
export interface ITheme {
    default: IThemeDefault;
    name: string;
    options?: ISourceOptions;
}
