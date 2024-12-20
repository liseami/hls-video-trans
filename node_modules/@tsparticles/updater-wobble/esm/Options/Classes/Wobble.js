import { isNull, isNumber, setRangeValue, } from "@tsparticles/engine";
import { WobbleSpeed } from "./WobbleSpeed.js";
export class Wobble {
    constructor() {
        this.distance = 5;
        this.enable = false;
        this.speed = new WobbleSpeed();
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = setRangeValue(data.distance);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            if (isNumber(data.speed)) {
                this.speed.load({ angle: data.speed });
            }
            else {
                const rangeSpeed = data.speed;
                if (rangeSpeed.min !== undefined) {
                    this.speed.load({ angle: rangeSpeed });
                }
                else {
                    this.speed.load(data.speed);
                }
            }
        }
    }
}
