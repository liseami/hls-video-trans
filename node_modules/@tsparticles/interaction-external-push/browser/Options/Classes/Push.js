import { isNull, setRangeValue } from "@tsparticles/engine";
export class Push {
    constructor() {
        this.default = true;
        this.groups = [];
        this.quantity = 4;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.default !== undefined) {
            this.default = data.default;
        }
        if (data.groups !== undefined) {
            this.groups = data.groups.map(t => t);
        }
        if (!this.groups.length) {
            this.default = true;
        }
        const quantity = data.quantity;
        if (quantity !== undefined) {
            this.quantity = setRangeValue(quantity);
        }
    }
}
