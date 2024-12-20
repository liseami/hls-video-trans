import { type IContainerPlugin, type ICoordinates, type IDelta, type RecursivePartial, type SingleOrMultiple } from "@tsparticles/engine";
import { Emitter } from "./Options/Classes/Emitter.js";
import type { EmitterContainer } from "./EmitterContainer.js";
import { EmitterInstance } from "./EmitterInstance.js";
import type { EmitterModeOptions } from "./types.js";
import type { EmittersEngine } from "./EmittersEngine.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";
export declare class Emitters implements IContainerPlugin {
    private readonly container;
    array: EmitterInstance[];
    emitters: SingleOrMultiple<Emitter>;
    interactivityEmitters: EmitterModeOptions;
    private readonly _engine;
    constructor(engine: EmittersEngine, container: EmitterContainer);
    addEmitter(options: RecursivePartial<IEmitter>, position?: ICoordinates): Promise<EmitterInstance>;
    handleClickMode(mode: string): void;
    init(): Promise<void>;
    pause(): void;
    play(): void;
    removeEmitter(emitter: EmitterInstance): void;
    resize(): void;
    stop(): void;
    update(delta: IDelta): void;
}
