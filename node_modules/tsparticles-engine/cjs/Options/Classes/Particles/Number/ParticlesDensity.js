"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticlesDensity = void 0;
class ParticlesDensity {
    constructor() {
        this.enable = false;
        this.width = 1920;
        this.height = 1080;
    }
    get area() {
        return this.width;
    }
    set area(value) {
        this.width = value;
    }
    get factor() {
        return this.height;
    }
    set factor(value) {
        this.height = value;
    }
    get value_area() {
        return this.area;
    }
    set value_area(value) {
        this.area = value;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const width = data.width ?? data.area ?? data.value_area;
        if (width !== undefined) {
            this.width = width;
        }
        const height = data.height ?? data.factor;
        if (height !== undefined) {
            this.height = height;
        }
    }
}
exports.ParticlesDensity = ParticlesDensity;
