import type { Engine } from "@tsparticles/engine";
import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";
export declare class ShapeManager {
    private readonly _engine;
    constructor(engine: Engine);
    addShapeGenerator(name: string, generator: IEmitterShapeGenerator): void;
    getShapeGenerator(name: string): IEmitterShapeGenerator | undefined;
    getSupportedShapeGenerators(): IterableIterator<string>;
}
