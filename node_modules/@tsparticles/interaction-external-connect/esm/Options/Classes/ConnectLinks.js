import { isNull } from "@tsparticles/engine";
export class ConnectLinks {
    constructor() {
        this.opacity = 0.5;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
