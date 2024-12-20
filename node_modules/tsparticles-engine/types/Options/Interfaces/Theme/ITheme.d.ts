import type { IOptions } from "../IOptions";
import type { IThemeDefault } from "./IThemeDefault";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
export interface ITheme {
    default: IThemeDefault;
    name: string;
    options?: RecursivePartial<IOptions>;
}
