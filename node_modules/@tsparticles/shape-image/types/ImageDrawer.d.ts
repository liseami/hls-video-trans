import { type Container, type IShapeDrawData, type IShapeDrawer } from "@tsparticles/engine";
import { type IImage, type ImageParticle } from "./Utils.js";
import type { ImageContainer, ImageEngine } from "./types.js";
export declare class ImageDrawer implements IShapeDrawer<ImageParticle> {
    readonly validTypes: readonly ["image", "images"];
    private readonly _engine;
    constructor(engine: ImageEngine);
    addImage(image: IImage): void;
    draw(data: IShapeDrawData<ImageParticle>): void;
    getSidesCount(): number;
    init(container: ImageContainer): Promise<void>;
    loadShape(particle: ImageParticle): void;
    particleInit(container: Container, particle: ImageParticle): void;
    private readonly loadImageShape;
}
