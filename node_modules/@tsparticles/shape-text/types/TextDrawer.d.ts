import { type Container, type IShapeDrawData, type IShapeDrawer } from "@tsparticles/engine";
import type { TextParticle } from "./TextParticle.js";
export declare class TextDrawer implements IShapeDrawer<TextParticle> {
    readonly validTypes: readonly ["text", "character", "char", "multiline-text"];
    draw(data: IShapeDrawData<TextParticle>): void;
    init(container: Container): Promise<void>;
    particleInit(container: Container, particle: TextParticle): void;
}
