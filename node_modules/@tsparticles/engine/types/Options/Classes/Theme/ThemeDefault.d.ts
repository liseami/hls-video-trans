import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { IThemeDefault } from "../../Interfaces/Theme/IThemeDefault.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { ThemeMode } from "../../../Enums/Modes/ThemeMode.js";
export declare class ThemeDefault implements IThemeDefault, IOptionLoader<IThemeDefault> {
    auto: boolean;
    mode: ThemeMode | keyof typeof ThemeMode;
    value: boolean;
    constructor();
    load(data?: RecursivePartial<IThemeDefault>): void;
}
