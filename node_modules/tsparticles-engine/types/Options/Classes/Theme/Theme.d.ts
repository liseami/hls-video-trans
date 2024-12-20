import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { IOptions } from "../../Interfaces/IOptions";
import type { ITheme } from "../../Interfaces/Theme/ITheme";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { ThemeDefault } from "./ThemeDefault";
export declare class Theme implements ITheme, IOptionLoader<ITheme> {
    default: ThemeDefault;
    name: string;
    options?: RecursivePartial<IOptions>;
    constructor();
    load(data?: RecursivePartial<ITheme>): void;
}
