"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
const Vector3d_1 = require("./Vector3d");
class Vector extends Vector3d_1.Vector3d {
    constructor(xOrCoords, y) {
        super(xOrCoords, y, 0);
    }
    static get origin() {
        return Vector.create(0, 0);
    }
    static clone(source) {
        return Vector.create(source.x, source.y);
    }
    static create(x, y) {
        return new Vector(x, y);
    }
}
exports.Vector = Vector;
