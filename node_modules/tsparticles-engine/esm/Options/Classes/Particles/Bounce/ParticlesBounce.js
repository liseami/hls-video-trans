import { ParticlesBounceFactor } from "./ParticlesBounceFactor";
export class ParticlesBounce {
    constructor() {
        this.horizontal = new ParticlesBounceFactor();
        this.vertical = new ParticlesBounceFactor();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.horizontal.load(data.horizontal);
        this.vertical.load(data.vertical);
    }
}
