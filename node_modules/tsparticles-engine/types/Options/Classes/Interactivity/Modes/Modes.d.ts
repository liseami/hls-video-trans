import type { Container } from "../../../../Core/Container";
import type { Engine } from "../../../../Core/Engine";
import type { IModes } from "../../../Interfaces/Interactivity/Modes/IModes";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Modes implements IModes, IOptionLoader<IModes> {
    [name: string]: unknown;
    private readonly _container;
    private readonly _engine;
    constructor(engine: Engine, container?: Container);
    load(data?: RecursivePartial<IModes>): void;
}
