import type { IColor, IColorManager, IRangeColor, IRgb, IRgba } from "@tsparticles/engine";
export declare class HexColorManager implements IColorManager {
    readonly key: string;
    readonly stringPrefix: string;
    constructor();
    handleColor(color: IColor): IRgb | undefined;
    handleRangeColor(color: IRangeColor): IRgb | undefined;
    parseString(input: string): IRgba | undefined;
    private _parseString;
}
