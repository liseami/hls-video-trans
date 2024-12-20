import { ParticlesDensity } from "./ParticlesDensity";
export class ParticlesNumber {
    constructor() {
        this.density = new ParticlesDensity();
        this.limit = 0;
        this.value = 0;
    }
    get max() {
        return this.limit;
    }
    set max(value) {
        this.limit = value;
    }
    load(data) {
        if (!data) {
            return;
        }
        this.density.load(data.density);
        const limit = data.limit ?? data.max;
        if (limit !== undefined) {
            this.limit = limit;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
