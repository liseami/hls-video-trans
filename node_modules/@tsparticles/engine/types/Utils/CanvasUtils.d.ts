import { AlterType } from "../Enums/Types/AlterType.js";
import type { Container } from "../Core/Container.js";
import type { IContainerPlugin } from "../Core/Interfaces/IContainerPlugin.js";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates.js";
import type { IDelta } from "../Core/Interfaces/IDelta.js";
import type { IDimension } from "../Core/Interfaces/IDimension.js";
import type { IDrawParticleParams } from "../Core/Interfaces/IDrawParticleParams.js";
import type { IHsl } from "../Core/Interfaces/Colors.js";
import type { Particle } from "../Core/Particle.js";
export declare function drawLine(context: CanvasRenderingContext2D, begin: ICoordinates, end: ICoordinates): void;
export declare function paintBase(context: CanvasRenderingContext2D, dimension: IDimension, baseColor?: string): void;
export declare function paintImage(context: CanvasRenderingContext2D, dimension: IDimension, image: HTMLImageElement | undefined, opacity: number): void;
export declare function clear(context: CanvasRenderingContext2D, dimension: IDimension): void;
export declare function drawParticle(data: IDrawParticleParams): void;
interface DrawShapeData {
    container: Container;
    context: CanvasRenderingContext2D;
    delta: IDelta;
    opacity: number;
    particle: Particle;
    radius: number;
    strokeWidth: number;
    transformData: {
        a: number;
        b: number;
        c: number;
        d: number;
    };
}
export declare function drawEffect(data: DrawShapeData): void;
export declare function drawShape(data: DrawShapeData): void;
export declare function drawShapeAfterDraw(data: DrawShapeData): void;
export declare function drawPlugin(context: CanvasRenderingContext2D, plugin: IContainerPlugin, delta: IDelta): void;
export declare function drawParticlePlugin(context: CanvasRenderingContext2D, plugin: IContainerPlugin, particle: Particle, delta: IDelta): void;
export declare function alterHsl(color: IHsl, type: AlterType, value: number): IHsl;
export {};
