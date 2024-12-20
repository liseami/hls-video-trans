(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../Utils/Utils", "./MoveAngle", "./MoveAttract", "./MoveCenter", "./MoveGravity", "./Path/MovePath", "./MoveTrail", "./OutModes", "./Spin", "../../../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Move = void 0;
    const Utils_1 = require("../../../../Utils/Utils");
    const MoveAngle_1 = require("./MoveAngle");
    const MoveAttract_1 = require("./MoveAttract");
    const MoveCenter_1 = require("./MoveCenter");
    const MoveGravity_1 = require("./MoveGravity");
    const MovePath_1 = require("./Path/MovePath");
    const MoveTrail_1 = require("./MoveTrail");
    const OutModes_1 = require("./OutModes");
    const Spin_1 = require("./Spin");
    const NumberUtils_1 = require("../../../../Utils/NumberUtils");
    class Move {
        constructor() {
            this.angle = new MoveAngle_1.MoveAngle();
            this.attract = new MoveAttract_1.MoveAttract();
            this.center = new MoveCenter_1.MoveCenter();
            this.decay = 0;
            this.distance = {};
            this.direction = "none";
            this.drift = 0;
            this.enable = false;
            this.gravity = new MoveGravity_1.MoveGravity();
            this.path = new MovePath_1.MovePath();
            this.outModes = new OutModes_1.OutModes();
            this.random = false;
            this.size = false;
            this.speed = 2;
            this.spin = new Spin_1.Spin();
            this.straight = false;
            this.trail = new MoveTrail_1.MoveTrail();
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
            this.angle.load((0, Utils_1.isNumber)(data.angle) ? { value: data.angle } : data.angle);
            this.attract.load(data.attract);
            this.center.load(data.center);
            if (data.decay !== undefined) {
                this.decay = (0, NumberUtils_1.setRangeValue)(data.decay);
            }
            if (data.direction !== undefined) {
                this.direction = data.direction;
            }
            if (data.distance !== undefined) {
                this.distance = (0, Utils_1.isNumber)(data.distance)
                    ? {
                        horizontal: data.distance,
                        vertical: data.distance,
                    }
                    : { ...data.distance };
            }
            if (data.drift !== undefined) {
                this.drift = (0, NumberUtils_1.setRangeValue)(data.drift);
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            this.gravity.load(data.gravity);
            const outModes = data.outModes ?? data.outMode ?? data.out_mode;
            if (outModes !== undefined) {
                if ((0, Utils_1.isObject)(outModes)) {
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
                this.speed = (0, NumberUtils_1.setRangeValue)(data.speed);
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
    exports.Move = Move;
});
