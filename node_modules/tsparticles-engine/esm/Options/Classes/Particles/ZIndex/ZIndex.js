import { ValueWithRandom } from "../../ValueWithRandom";
export class ZIndex extends ValueWithRandom {
    constructor() {
        super();
        this.opacityRate = 1;
        this.sizeRate = 1;
        this.velocityRate = 1;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        if (data.opacityRate !== undefined) {
            this.opacityRate = data.opacityRate;
        }
        if (data.sizeRate !== undefined) {
            this.sizeRate = data.sizeRate;
        }
        if (data.velocityRate !== undefined) {
            this.velocityRate = data.velocityRate;
        }
    }
}
