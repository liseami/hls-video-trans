import type { Engine, IContainerPlugin, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { IPreloadOptions, PreloadOptions } from "./types.js";
export declare class ImagePreloaderPlugin implements IPlugin {
    readonly id: string;
    private readonly _engine;
    constructor(engine: Engine);
    getPlugin(): Promise<IContainerPlugin>;
    loadOptions(options: PreloadOptions, source?: RecursivePartial<IPreloadOptions>): void;
    needsPlugin(): boolean;
}
