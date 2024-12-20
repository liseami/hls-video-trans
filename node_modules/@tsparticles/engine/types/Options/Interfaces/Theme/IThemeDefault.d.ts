import type { ThemeMode } from "../../../Enums/Modes/ThemeMode.js";
export interface IThemeDefault {
    auto: boolean;
    mode: ThemeMode | keyof typeof ThemeMode;
    value: boolean;
}
