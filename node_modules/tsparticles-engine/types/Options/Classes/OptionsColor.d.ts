import type { IRangeHsl, IRangeHsv, IRangeRgb, IRangeValueColor } from "../../Core/Interfaces/Colors";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IOptionsColor } from "../Interfaces/IOptionsColor";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";
export declare class OptionsColor implements IOptionsColor, IOptionLoader<IOptionsColor> {
    value: SingleOrMultiple<SingleOrMultiple<string> | IRangeValueColor | IRangeRgb | IRangeHsl | IRangeHsv>;
    constructor();
    static create(source?: OptionsColor, data?: SingleOrMultiple<string> | RecursivePartial<IOptionsColor>): OptionsColor;
    load(data?: RecursivePartial<IOptionsColor>): void;
}
