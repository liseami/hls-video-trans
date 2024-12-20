import type { IShapeDrawData } from "@tsparticles/engine";
import { type IImage, type ImageParticle } from "../Utils.js";
import type { GIF } from "./Types/GIF.js";
import type { GIFProgressCallbackFunction } from "./Types/GIFProgressCallbackFunction.js";
export declare function getGIFLoopAmount(gif: GIF): number;
export declare function decodeGIF(gifURL: string, progressCallback?: GIFProgressCallbackFunction, avgAlpha?: boolean): Promise<GIF>;
export declare function drawGif(data: IShapeDrawData<ImageParticle>): void;
export declare function loadGifImage(image: IImage): Promise<void>;
