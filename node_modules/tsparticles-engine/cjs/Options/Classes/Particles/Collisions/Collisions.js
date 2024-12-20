"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collisions = void 0;
const CollisionsAbsorb_1 = require("./CollisionsAbsorb");
const CollisionsOverlap_1 = require("./CollisionsOverlap");
const ParticlesBounce_1 = require("../Bounce/ParticlesBounce");
const NumberUtils_1 = require("../../../../Utils/NumberUtils");
class Collisions {
    constructor() {
        this.absorb = new CollisionsAbsorb_1.CollisionsAbsorb();
        this.bounce = new ParticlesBounce_1.ParticlesBounce();
        this.enable = false;
        this.maxSpeed = 50;
        this.mode = "bounce";
        this.overlap = new CollisionsOverlap_1.CollisionsOverlap();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.absorb.load(data.absorb);
        this.bounce.load(data.bounce);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.maxSpeed !== undefined) {
            this.maxSpeed = (0, NumberUtils_1.setRangeValue)(data.maxSpeed);
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.overlap.load(data.overlap);
    }
}
exports.Collisions = Collisions;
