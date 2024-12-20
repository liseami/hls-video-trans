import type { Container } from "../../../../Core/Container.js";
import type { Engine } from "../../../../Core/Engine.js";
import type { IModes } from "../../../Interfaces/Interactivity/Modes/IModes.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
export declare class Modes implements IModes, IOptionLoader<IModes> {
    [name: string]: unknown;
    private readonly _container;
    private readonly _engine;
    constructor(engine: Engine, container?: Container);
    load(data?: RecursivePartial<IModes>): void;
}
