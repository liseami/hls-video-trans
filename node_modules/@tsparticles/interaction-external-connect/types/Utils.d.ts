import type { ConnectContainer, LinkParticle } from "./Types.js";
import { type ICoordinates, type Particle } from "@tsparticles/engine";
export declare function gradient(context: CanvasRenderingContext2D, p1: Particle, p2: Particle, opacity: number): CanvasGradient | undefined;
export declare function drawConnectLine(context: CanvasRenderingContext2D, width: number, lineStyle: CanvasGradient, begin: ICoordinates, end: ICoordinates): void;
export declare function lineStyle(container: ConnectContainer, ctx: CanvasRenderingContext2D, p1: Particle, p2: Particle): CanvasGradient | undefined;
export declare function drawConnection(container: ConnectContainer, p1: LinkParticle, p2: LinkParticle): void;
