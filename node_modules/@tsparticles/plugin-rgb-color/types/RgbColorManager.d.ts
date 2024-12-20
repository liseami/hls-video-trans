import { type IColor, type IColorManager, type IRangeColor, type IRgb, type IRgba } from "@tsparticles/engine";
export declare class RgbColorManager implements IColorManager {
    readonly key: string;
    readonly stringPrefix: string;
    constructor();
    handleColor(color: IColor): IRgb | undefined;
    handleRangeColor(color: IRangeColor): IRgb | undefined;
    parseString(input: string): IRgba | undefined;
}
