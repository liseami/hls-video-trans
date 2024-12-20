import type { ApplicationExtension } from "./ApplicationExtension.js";
import type { Frame } from "./Frame.js";
import type { IRgb } from "@tsparticles/engine";
export interface GIF {
    applicationExtensions: ApplicationExtension[];
    backgroundImage: ImageData;
    colorRes: number;
    comments: [number, string][];
    frames: Frame[];
    globalColorTable: IRgb[];
    height: number;
    pixelAspectRatio: number;
    sortFlag: boolean;
    totalTime: number;
    width: number;
}
