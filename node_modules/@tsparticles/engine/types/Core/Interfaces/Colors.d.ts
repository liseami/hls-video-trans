import type { RangeValue } from "../../Types/RangeValue.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";
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
export interface IOklch {
    c: number;
    h: number;
    l: number;
}
export interface ILch {
    c: number;
    h: number;
    l: number;
}
export interface IRangeOklch {
    c: RangeValue;
    h: RangeValue;
    l: RangeValue;
}
export interface IRangeLch {
    c: RangeValue;
    h: RangeValue;
    l: RangeValue;
}
export interface IOklcha extends IOklch, IAlphaColor {
}
export interface ILcha extends ILch, IAlphaColor {
}
export interface IValueColor {
    hsl?: IHsl;
    hsv?: IHsv;
    lch?: ILch;
    oklch?: IOklch;
    rgb?: IRgb;
}
export interface IRangeValueColor {
    hsl?: IRangeHsl;
    hsv?: IRangeHsv;
    lch?: IRangeLch;
    oklch?: IRangeOklch;
    rgb?: IRangeRgb;
}
