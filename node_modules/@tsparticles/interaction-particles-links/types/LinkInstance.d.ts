import { type Engine, type IContainerPlugin } from "@tsparticles/engine";
import type { LinkContainer, LinkParticle } from "./Types.js";
export declare class LinkInstance implements IContainerPlugin {
    private readonly _container;
    private readonly _engine;
    private readonly _freqs;
    constructor(container: LinkContainer, engine: Engine);
    drawParticle(context: CanvasRenderingContext2D, particle: LinkParticle): void;
    init(): Promise<void>;
    particleCreated(particle: LinkParticle): void;
    particleDestroyed(particle: LinkParticle): void;
    private readonly _drawLinkLine;
    private readonly _drawLinkTriangle;
    private readonly _drawTriangles;
    private readonly _getLinkFrequency;
    private readonly _getTriangleFrequency;
}
