import type { AbsorberOptions, IAbsorberOptions } from "./types.js";
import { type Engine, type IOptions, type IPlugin, type RecursivePartial } from "@tsparticles/engine";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import { Absorbers } from "./Absorbers.js";
export declare class AbsorbersPlugin implements IPlugin {
    readonly id: string;
    private readonly _engine;
    constructor(engine: Engine);
    getPlugin(container: AbsorberContainer): Promise<Absorbers>;
    loadOptions(options: AbsorberOptions, source?: RecursivePartial<IAbsorberOptions>): void;
    needsPlugin(options?: RecursivePartial<IOptions & IAbsorberOptions>): boolean;
}
