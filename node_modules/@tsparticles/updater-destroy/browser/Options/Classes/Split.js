import { OptionsColor, deepExtend, executeOnSingleOrMultiple, isNull, } from "@tsparticles/engine";
import { SplitFactor } from "./SplitFactor.js";
import { SplitRate } from "./SplitRate.js";
export class Split {
    constructor() {
        this.count = 1;
        this.factor = new SplitFactor();
        this.rate = new SplitRate();
        this.sizeOffset = true;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        this.factor.load(data.factor);
        this.rate.load(data.rate);
        this.particles = executeOnSingleOrMultiple(data.particles, particles => {
            return deepExtend({}, particles);
        });
        if (data.sizeOffset !== undefined) {
            this.sizeOffset = data.sizeOffset;
        }
        if (data.colorOffset) {
            this.colorOffset = this.colorOffset ?? {};
            if (data.colorOffset.h !== undefined) {
                this.colorOffset.h = data.colorOffset.h;
            }
            if (data.colorOffset.s !== undefined) {
                this.colorOffset.s = data.colorOffset.s;
            }
            if (data.colorOffset.l !== undefined) {
                this.colorOffset.l = data.colorOffset.l;
            }
        }
    }
}
