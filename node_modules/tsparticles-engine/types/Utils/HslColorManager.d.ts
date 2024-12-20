import type { IColor, IRangeColor, IRgb, IRgba } from "../Core/Interfaces/Colors";
import type { IColorManager } from "../Core/Interfaces/IColorManager";
export declare class HslColorManager implements IColorManager {
    readonly key: string;
    readonly stringPrefix: string;
    constructor();
    handleColor(color: IColor): IRgb | undefined;
    handleRangeColor(color: IRangeColor): IRgb | undefined;
    parseString(input: string): IRgba | undefined;
}
