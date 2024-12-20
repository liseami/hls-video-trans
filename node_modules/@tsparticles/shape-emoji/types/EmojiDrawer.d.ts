import { type Container, type IShapeDrawData, type IShapeDrawer } from "@tsparticles/engine";
import type { EmojiParticle } from "./EmojiParticle.js";
export declare class EmojiDrawer implements IShapeDrawer<EmojiParticle> {
    readonly validTypes: readonly ["emoji"];
    private readonly _emojiShapeDict;
    destroy(): void;
    draw(data: IShapeDrawData<EmojiParticle>): void;
    init(container: Container): Promise<void>;
    particleDestroy(particle: EmojiParticle): void;
    particleInit(_container: Container, particle: EmojiParticle): void;
}
