import { isNull } from "@tsparticles/engine";
import { ConnectLinks } from "./ConnectLinks.js";
export class Connect {
    constructor() {
        this.distance = 80;
        this.links = new ConnectLinks();
        this.radius = 60;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        this.links.load(data.links);
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
