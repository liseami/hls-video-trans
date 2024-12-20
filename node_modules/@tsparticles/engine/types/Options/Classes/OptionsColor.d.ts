import type { IRangeHsl, IRangeHsv, IRangeRgb, IRangeValueColor } from "../../Core/Interfaces/Colors.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { IOptionsColor } from "../Interfaces/IOptionsColor.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";
export declare class OptionsColor implements IOptionsColor, IOptionLoader<IOptionsColor> {
    value: SingleOrMultiple<SingleOrMultiple<string> | IRangeValueColor | IRangeRgb | IRangeHsl | IRangeHsv>;
    constructor();
    static create(source?: OptionsColor, data?: SingleOrMultiple<string> | RecursivePartial<IOptionsColor>): OptionsColor;
    load(data?: RecursivePartial<IOptionsColor>): void;
}
