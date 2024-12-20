import { isNull, setRangeValue } from "@tsparticles/engine";
export class Remove {
    constructor() {
        this.quantity = 2;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        const quantity = data.quantity;
        if (quantity !== undefined) {
            this.quantity = setRangeValue(quantity);
        }
    }
}
