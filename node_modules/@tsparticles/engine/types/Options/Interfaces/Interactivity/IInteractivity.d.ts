import type { IEvents } from "./Events/IEvents.js";
import type { IModes } from "./Modes/IModes.js";
import type { InteractivityDetect } from "../../../Enums/InteractivityDetect.js";
export interface IInteractivity {
    [name: string]: unknown;
    detectsOn: InteractivityDetect | keyof typeof InteractivityDetect;
    events: IEvents;
    modes: IModes;
}
