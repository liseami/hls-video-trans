import type { DisposalMethod } from "../Enums/DisposalMethod.js";
import type { IRgb } from "@tsparticles/engine";
import type { PlainTextData } from "./PlainTextData.js";
export interface Frame {
    GCreserved: number;
    bitmap?: ImageBitmap;
    delayTime: number;
    disposalMethod: DisposalMethod;
    height: number;
    image: ImageData;
    left: number;
    localColorTable: IRgb[];
    plainTextData: PlainTextData | null;
    reserved: number;
    sortFlag: boolean;
    top: number;
    userInputDelayFlag: boolean;
    width: number;
}
