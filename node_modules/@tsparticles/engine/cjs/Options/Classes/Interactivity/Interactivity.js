"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interactivity = void 0;
const Events_js_1 = require("./Events/Events.js");
const InteractivityDetect_js_1 = require("../../../Enums/InteractivityDetect.js");
const Modes_js_1 = require("./Modes/Modes.js");
const TypeUtils_js_1 = require("../../../Utils/TypeUtils.js");
class Interactivity {
    constructor(engine, container) {
        this.detectsOn = InteractivityDetect_js_1.InteractivityDetect.window;
        this.events = new Events_js_1.Events();
        this.modes = new Modes_js_1.Modes(engine, container);
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
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
exports.Interactivity = Interactivity;
