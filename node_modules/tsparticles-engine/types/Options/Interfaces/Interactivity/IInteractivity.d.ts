import type { IEvents } from "./Events/IEvents";
import type { IModes } from "./Modes/IModes";
import type { InteractivityDetect } from "../../../Enums/InteractivityDetect";
export interface IInteractivity {
    [name: string]: unknown;
    detect_on: InteractivityDetect | keyof typeof InteractivityDetect;
    detectsOn: InteractivityDetect | keyof typeof InteractivityDetect;
    events: IEvents;
    modes: IModes;
}
