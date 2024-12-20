"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interactivity = void 0;
const Events_1 = require("./Events/Events");
const Modes_1 = require("./Modes/Modes");
class Interactivity {
    constructor(engine, container) {
        this.detectsOn = "window";
        this.events = new Events_1.Events();
        this.modes = new Modes_1.Modes(engine, container);
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
exports.Interactivity = Interactivity;
