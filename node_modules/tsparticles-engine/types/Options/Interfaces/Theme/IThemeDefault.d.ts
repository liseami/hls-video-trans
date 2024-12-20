import type { ThemeMode } from "../../../Enums/Modes/ThemeMode";
export interface IThemeDefault {
    auto: boolean;
    mode: ThemeMode | keyof typeof ThemeMode;
    value: boolean;
}
