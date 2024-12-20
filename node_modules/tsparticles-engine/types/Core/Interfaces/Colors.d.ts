import type { RangeValue } from "../../Types/RangeValue";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";
export interface IAlphaColor {
    a: number;
}
export interface IColor {
    value: SingleOrMultiple<IValueColor | IRgb | IHsl | IHsv | SingleOrMultiple<string>>;
}
export interface IRangeColor {
    value: SingleOrMultiple<IRangeValueColor | IRangeRgb | IRangeHsl | IRangeHsv | SingleOrMultiple<string>>;
}
export interface IHsl {
    h: number;
    l: number;
    s: number;
}
export interface IRangeHsl {
    h: RangeValue;
    l: RangeValue;
    s: RangeValue;
}
export interface IHsla extends IHsl, IAlphaColor {
}
export interface IHsv {
    h: number;
    s: number;
    v: number;
}
export interface IRangeHsv {
    h: RangeValue;
    s: RangeValue;
    v: RangeValue;
}
export interface IHsva extends IHsv, IAlphaColor {
}
export interface IRgb {
    b: number;
    g: number;
    r: number;
}
export interface IRangeRgb {
    b: RangeValue;
    g: RangeValue;
    r: RangeValue;
}
export interface IRgba extends IRgb, IAlphaColor {
}
export interface IValueColor {
    hsl?: IHsl;
    hsv?: IHsv;
    rgb?: IRgb;
}
export interface IRangeValueColor {
    hsl?: IRangeHsl;
    hsv?: IRangeHsv;
    rgb?: IRangeRgb;
}
