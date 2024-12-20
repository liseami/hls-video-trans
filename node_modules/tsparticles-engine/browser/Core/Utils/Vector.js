import { Vector3d } from "./Vector3d";
export class Vector extends Vector3d {
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
