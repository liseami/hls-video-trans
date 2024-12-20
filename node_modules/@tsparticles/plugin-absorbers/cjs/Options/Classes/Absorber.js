"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Absorber = void 0;
const engine_1 = require("@tsparticles/engine");
const AbsorberSize_js_1 = require("./AbsorberSize.js");
class Absorber {
    constructor() {
        this.color = new engine_1.OptionsColor();
        this.color.value = "#000000";
        this.draggable = false;
        this.opacity = 1;
        this.destroy = true;
        this.orbits = false;
        this.size = new AbsorberSize_js_1.AbsorberSize();
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.color !== undefined) {
            this.color = engine_1.OptionsColor.create(this.color, data.color);
        }
        if (data.draggable !== undefined) {
            this.draggable = data.draggable;
        }
        this.name = data.name;
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        if (data.position !== undefined) {
            this.position = {};
            if (data.position.x !== undefined) {
                this.position.x = (0, engine_1.setRangeValue)(data.position.x);
            }
            if (data.position.y !== undefined) {
                this.position.y = (0, engine_1.setRangeValue)(data.position.y);
            }
        }
        if (data.size !== undefined) {
            this.size.load(data.size);
        }
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
        if (data.orbits !== undefined) {
            this.orbits = data.orbits;
        }
    }
}
exports.Absorber = Absorber;
