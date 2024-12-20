import { Events } from "./Events/Events.js";
import { InteractivityDetect } from "../../../Enums/InteractivityDetect.js";
import { Modes } from "./Modes/Modes.js";
import { isNull } from "../../../Utils/TypeUtils.js";
export class Interactivity {
    constructor(engine, container) {
        this.detectsOn = InteractivityDetect.window;
        this.events = new Events();
        this.modes = new Modes(engine, container);
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        const detectsOn = data.detectsOn;
        if (detectsOn !== undefined) {
            this.detectsOn = detectsOn;
        }
        this.events.load(data.events);
        this.modes.load(data.modes);
    }
}
