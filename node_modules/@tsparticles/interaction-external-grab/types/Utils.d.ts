import type { GrabContainer, LinkParticle } from "./Types.js";
import { type ICoordinates, type IRgb } from "@tsparticles/engine";
export declare function drawGrabLine(context: CanvasRenderingContext2D, width: number, begin: ICoordinates, end: ICoordinates, colorLine: IRgb, opacity: number): void;
export declare function drawGrab(container: GrabContainer, particle: LinkParticle, lineColor: IRgb, opacity: number, mousePos: ICoordinates): void;
