import { isNumber, isObject } from "../../../../Utils/Utils";
import { MoveAngle } from "./MoveAngle";
import { MoveAttract } from "./MoveAttract";
import { MoveCenter } from "./MoveCenter";
import { MoveGravity } from "./MoveGravity";
import { MovePath } from "./Path/MovePath";
import { MoveTrail } from "./MoveTrail";
import { OutModes } from "./OutModes";
import { Spin } from "./Spin";
import { setRangeValue } from "../../../../Utils/NumberUtils";
export class Move {
    constructor() {
        this.angle = new MoveAngle();
        this.attract = new MoveAttract();
        this.center = new MoveCenter();
        this.decay = 0;
        this.distance = {};
        this.direction = "none";
        this.drift = 0;
        this.enable = false;
        this.gravity = new MoveGravity();
        this.path = new MovePath();
        this.outModes = new OutModes();
        this.random = false;
        this.size = false;
        this.speed = 2;
        this.spin = new Spin();
        this.straight = false;
        this.trail = new MoveTrail();
        this.vibrate = false;
        this.warp = false;
    }
    get bounce() {
        return this.collisions;
    }
    set bounce(value) {
        this.collisions = value;
    }
    get collisions() {
        return false;
    }
    set collisions(_) {
    }
    get noise() {
        return this.path;
    }
    set noise(value) {
        this.path = value;
    }
    get outMode() {
        return this.outModes.default;
    }
    set outMode(value) {
        this.outModes.default = value;
    }
    get out_mode() {
        return this.outMode;
    }
    set out_mode(value) {
        this.outMode = value;
    }
    load(data) {
        if (!data) {
            return;
        }
        this.angle.load(isNumber(data.angle) ? { value: data.angle } : data.angle);
        this.attract.load(data.attract);
        this.center.load(data.center);
        if (data.decay !== undefined) {
            this.decay = setRangeValue(data.decay);
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        if (data.distance !== undefined) {
            this.distance = isNumber(data.distance)
                ? {
                    horizontal: data.distance,
                    vertical: data.distance,
                }
                : { ...data.distance };
        }
        if (data.drift !== undefined) {
            this.drift = setRangeValue(data.drift);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.gravity.load(data.gravity);
        const outModes = data.outModes ?? data.outMode ?? data.out_mode;
        if (outModes !== undefined) {
            if (isObject(outModes)) {
                this.outModes.load(outModes);
            }
            else {
                this.outModes.load({
                    default: outModes,
                });
            }
        }
        this.path.load(data.path ?? data.noise);
        if (data.random !== undefined) {
            this.random = data.random;
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }
        this.spin.load(data.spin);
        if (data.straight !== undefined) {
            this.straight = data.straight;
        }
        this.trail.load(data.trail);
        if (data.vibrate !== undefined) {
            this.vibrate = data.vibrate;
        }
        if (data.warp !== undefined) {
            this.warp = data.warp;
        }
    }
}
