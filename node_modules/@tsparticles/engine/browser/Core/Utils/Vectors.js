import { errorPrefix } from "./Constants.js";
import { isNumber } from "../../Utils/TypeUtils.js";
const origin = {
    x: 0,
    y: 0,
    z: 0,
}, squareExp = 2, inverseFactorNumerator = 1.0;
export class Vector3d {
    constructor(xOrCoords, y, z) {
        this._updateFromAngle = (angle, length) => {
            this.x = Math.cos(angle) * length;
            this.y = Math.sin(angle) * length;
        };
        if (!isNumber(xOrCoords) && xOrCoords) {
            this.x = xOrCoords.x;
            this.y = xOrCoords.y;
            const coords3d = xOrCoords;
            this.z = coords3d.z ? coords3d.z : origin.z;
        }
        else if (xOrCoords !== undefined && y !== undefined) {
            this.x = xOrCoords;
            this.y = y;
            this.z = z ?? origin.z;
        }
        else {
            throw new Error(`${errorPrefix} Vector3d not initialized correctly`);
        }
    }
    static get origin() {
        return Vector3d.create(origin.x, origin.y, origin.z);
    }
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    set angle(angle) {
        this._updateFromAngle(angle, this.length);
    }
    get length() {
        return Math.sqrt(this.getLengthSq());
    }
    set length(length) {
        this._updateFromAngle(this.angle, length);
    }
    static clone(source) {
        return Vector3d.create(source.x, source.y, source.z);
    }
    static create(x, y, z) {
        return new Vector3d(x, y, z);
    }
    add(v) {
        return Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    addTo(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }
    copy() {
        return Vector3d.clone(this);
    }
    distanceTo(v) {
        return this.sub(v).length;
    }
    distanceToSq(v) {
        return this.sub(v).getLengthSq();
    }
    div(n) {
        return Vector3d.create(this.x / n, this.y / n, this.z / n);
    }
    divTo(n) {
        this.x /= n;
        this.y /= n;
        this.z /= n;
    }
    getLengthSq() {
        return this.x ** squareExp + this.y ** squareExp;
    }
    mult(n) {
        return Vector3d.create(this.x * n, this.y * n, this.z * n);
    }
    multTo(n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
    }
    normalize() {
        const length = this.length, noLength = 0;
        if (length != noLength) {
            this.multTo(inverseFactorNumerator / length);
        }
    }
    rotate(angle) {
        return Vector3d.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle), origin.z);
    }
    setTo(c) {
        this.x = c.x;
        this.y = c.y;
        const v3d = c;
        this.z = v3d.z ? v3d.z : origin.z;
    }
    sub(v) {
        return Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    subFrom(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    }
}
export class Vector extends Vector3d {
    constructor(xOrCoords, y) {
        super(xOrCoords, y, origin.z);
    }
    static get origin() {
        return Vector.create(origin.x, origin.y);
    }
    static clone(source) {
        return Vector.create(source.x, source.y);
    }
    static create(x, y) {
        return new Vector(x, y);
    }
}
