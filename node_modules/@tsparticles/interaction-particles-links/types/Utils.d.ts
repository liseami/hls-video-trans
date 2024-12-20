import { type ICoordinates } from "@tsparticles/engine";
import type { LinkLineDrawParams, LinkParticle, LinkTriangleDrawParams } from "./Types.js";
export declare function drawTriangle(context: CanvasRenderingContext2D, p1: ICoordinates, p2: ICoordinates, p3: ICoordinates): void;
export declare function drawLinkLine(params: LinkLineDrawParams): void;
export declare function drawLinkTriangle(params: LinkTriangleDrawParams): void;
export declare function getLinkKey(ids: number[]): string;
export declare function setLinkFrequency(particles: LinkParticle[], dictionary: Map<string, number>): number;
