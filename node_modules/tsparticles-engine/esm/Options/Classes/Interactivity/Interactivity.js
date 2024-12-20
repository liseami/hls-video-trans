import { Events } from "./Events/Events";
import { Modes } from "./Modes/Modes";
export class Interactivity {
    constructor(engine, container) {
        this.detectsOn = "window";
        this.events = new Events();
        this.modes = new Modes(engine, container);
    }
    get detect_on() {
        return this.detectsOn;
    }
    set detect_on(value) {
        this.detectsOn = value;
    }
    load(data) {
        if (!data) {
            return;
        }
        const detectsOn = data.detectsOn ?? data.detect_on;
        if (detectsOn !== undefined) {
            this.detectsOn = detectsOn;
        }
        this.events.load(data.events);
        this.modes.load(data.modes);
    }
}
