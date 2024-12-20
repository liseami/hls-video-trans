const shapeGeneratorss = new Map();
export class ShapeManager {
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
