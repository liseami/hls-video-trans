"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collisions = void 0;
const CollisionMode_js_1 = require("../../../../Enums/Modes/CollisionMode.js");
const CollisionsAbsorb_js_1 = require("./CollisionsAbsorb.js");
const CollisionsOverlap_js_1 = require("./CollisionsOverlap.js");
const ParticlesBounce_js_1 = require("../Bounce/ParticlesBounce.js");
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
const NumberUtils_js_1 = require("../../../../Utils/NumberUtils.js");
class Collisions {
    constructor() {
        this.absorb = new CollisionsAbsorb_js_1.CollisionsAbsorb();
        this.bounce = new ParticlesBounce_js_1.ParticlesBounce();
        this.enable = false;
        this.maxSpeed = 50;
        this.mode = CollisionMode_js_1.CollisionMode.bounce;
        this.overlap = new CollisionsOverlap_js_1.CollisionsOverlap();
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        this.absorb.load(data.absorb);
        this.bounce.load(data.bounce);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.maxSpeed !== undefined) {
            this.maxSpeed = (0, NumberUtils_js_1.setRangeValue)(data.maxSpeed);
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.overlap.load(data.overlap);
    }
}
exports.Collisions = Collisions;
