import type { EmitterOptions, IEmitterOptions } from "./types.js";
import { type IOptions, type IPlugin, type RecursivePartial } from "@tsparticles/engine";
import type { EmitterContainer } from "./EmitterContainer.js";
import { Emitters } from "./Emitters.js";
import type { EmittersEngine } from "./EmittersEngine.js";
export declare class EmittersPlugin implements IPlugin {
    readonly id: string;
    private readonly _engine;
    constructor(engine: EmittersEngine);
    getPlugin(container: EmitterContainer): Promise<Emitters>;
    loadOptions(options: EmitterOptions, source?: RecursivePartial<IEmitterOptions>): void;
    needsPlugin(options?: RecursivePartial<IOptions & IEmitterOptions>): boolean;
}
