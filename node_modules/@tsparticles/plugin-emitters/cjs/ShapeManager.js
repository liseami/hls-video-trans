"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeManager = void 0;
const shapeGeneratorss = new Map();
class ShapeManager {
    constructor(engine) {
        this._engine = engine;
    }
    addShapeGenerator(name, generator) {
        if (!this.getShapeGenerator(name)) {
            shapeGeneratorss.set(name, generator);
        }
    }
    getShapeGenerator(name) {
        return shapeGeneratorss.get(name);
    }
    getSupportedShapeGenerators() {
        return shapeGeneratorss.keys();
    }
}
exports.ShapeManager = ShapeManager;
