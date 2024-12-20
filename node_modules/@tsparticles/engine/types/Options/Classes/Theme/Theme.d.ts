import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { ISourceOptions } from "../../../Types/ISourceOptions.js";
import type { ITheme } from "../../Interfaces/Theme/ITheme.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { ThemeDefault } from "./ThemeDefault.js";
export declare class Theme implements ITheme, IOptionLoader<ITheme> {
    readonly default: ThemeDefault;
    name: string;
    options?: ISourceOptions;
    constructor();
    load(data?: RecursivePartial<ITheme>): void;
}
