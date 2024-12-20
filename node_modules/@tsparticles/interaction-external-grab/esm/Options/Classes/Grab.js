import { isNull } from "@tsparticles/engine";
import { GrabLinks } from "./GrabLinks.js";
export class Grab {
    constructor() {
        this.distance = 100;
        this.links = new GrabLinks();
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        this.links.load(data.links);
    }
}
