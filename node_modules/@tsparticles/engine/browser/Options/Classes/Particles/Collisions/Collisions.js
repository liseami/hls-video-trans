import { CollisionMode } from "../../../../Enums/Modes/CollisionMode.js";
import { CollisionsAbsorb } from "./CollisionsAbsorb.js";
import { CollisionsOverlap } from "./CollisionsOverlap.js";
import { ParticlesBounce } from "../Bounce/ParticlesBounce.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
import { setRangeValue } from "../../../../Utils/NumberUtils.js";
export class Collisions {
    constructor() {
        this.absorb = new CollisionsAbsorb();
        this.bounce = new ParticlesBounce();
        this.enable = false;
        this.maxSpeed = 50;
        this.mode = CollisionMode.bounce;
        this.overlap = new CollisionsOverlap();
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        this.absorb.load(data.absorb);
        this.bounce.load(data.bounce);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.maxSpeed !== undefined) {
            this.maxSpeed = setRangeValue(data.maxSpeed);
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.overlap.load(data.overlap);
    }
}
