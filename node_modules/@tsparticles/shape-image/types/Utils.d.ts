import { type IHsl, type Particle } from "@tsparticles/engine";
import type { GIF } from "./GifUtils/Types/GIF.js";
import type { IImageShape } from "./IImageShape.js";
export interface IImage {
    color?: IHsl;
    element?: HTMLImageElement;
    error: boolean;
    gif: boolean;
    gifData?: GIF;
    gifLoopCount?: number;
    loading: boolean;
    name: string;
    ratio?: number;
    replaceColor?: boolean;
    source: string;
    svgData?: string;
    type: string;
}
export interface IParticleImage {
    color?: IHsl;
    data: IImage;
    element?: HTMLImageElement;
    gif: boolean;
    gifData?: GIF;
    gifLoopCount?: number;
    loaded?: boolean;
    ratio: number;
    replaceColor: boolean;
    source: string;
}
export type ImageParticle = Particle & {
    gifFrame?: number;
    gifLoopCount?: number;
    gifTime?: number;
    image?: IParticleImage;
};
export declare function loadImage(image: IImage): Promise<void>;
export declare function downloadSvgImage(image: IImage): Promise<void>;
export declare function replaceImageColor(image: IImage, imageData: IImageShape, color: IHsl, particle: Particle): Promise<IParticleImage>;
