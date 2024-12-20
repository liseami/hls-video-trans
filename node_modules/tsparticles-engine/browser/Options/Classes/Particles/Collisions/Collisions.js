import { CollisionsAbsorb } from "./CollisionsAbsorb";
import { CollisionsOverlap } from "./CollisionsOverlap";
import { ParticlesBounce } from "../Bounce/ParticlesBounce";
import { setRangeValue } from "../../../../Utils/NumberUtils";
export class Collisions {
    constructor() {
        this.absorb = new CollisionsAbsorb();
        this.bounce = new ParticlesBounce();
        this.enable = false;
        this.maxSpeed = 50;
        this.mode = "bounce";
        this.overlap = new CollisionsOverlap();
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
            this.maxSpeed = setRangeValue(data.maxSpeed);
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.overlap.load(data.overlap);
    }
}
