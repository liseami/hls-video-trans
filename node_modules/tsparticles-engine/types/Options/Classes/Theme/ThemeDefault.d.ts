import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { IThemeDefault } from "../../Interfaces/Theme/IThemeDefault";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { ThemeMode } from "../../../Enums/Modes/ThemeMode";
export declare class ThemeDefault implements IThemeDefault, IOptionLoader<IThemeDefault> {
    auto: boolean;
    mode: ThemeMode | keyof typeof ThemeMode;
    value: boolean;
    constructor();
    load(data?: RecursivePartial<IThemeDefault>): void;
}
