import type { Engine, IPlugin } from "@tsparticles/engine";
import type { LinkContainer } from "./Types.js";
import { LinkInstance } from "./LinkInstance.js";
export declare class LinksPlugin implements IPlugin {
    readonly id: string;
    private readonly _engine;
    constructor(engine: Engine);
    getPlugin(container: LinkContainer): Promise<LinkInstance>;
    loadOptions(): void;
    needsPlugin(): boolean;
}
