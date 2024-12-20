import type { Container } from "../../../Core/Container.js";
import type { Engine } from "../../../Core/Engine.js";
import { Events } from "./Events/Events.js";
import type { IInteractivity } from "../../Interfaces/Interactivity/IInteractivity.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import { InteractivityDetect } from "../../../Enums/InteractivityDetect.js";
import { Modes } from "./Modes/Modes.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
export declare class Interactivity implements IInteractivity, IOptionLoader<IInteractivity> {
    [name: string]: unknown;
    detectsOn: InteractivityDetect | keyof typeof InteractivityDetect;
    readonly events: Events;
    readonly modes: Modes;
    constructor(engine: Engine, container?: Container);
    load(data?: RecursivePartial<IInteractivity>): void;
}
