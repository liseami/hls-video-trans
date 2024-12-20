(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../Enums/Directions/MoveDirection.js", "../../../../Utils/TypeUtils.js", "./MoveAngle.js", "./MoveAttract.js", "./MoveCenter.js", "./MoveGravity.js", "./Path/MovePath.js", "./MoveTrail.js", "./OutModes.js", "./Spin.js", "../../../../Utils/NumberUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Move = void 0;
    const MoveDirection_js_1 = require("../../../../Enums/Directions/MoveDirection.js");
    const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
    const MoveAngle_js_1 = require("./MoveAngle.js");
    const MoveAttract_js_1 = require("./MoveAttract.js");
    const MoveCenter_js_1 = require("./MoveCenter.js");
    const MoveGravity_js_1 = require("./MoveGravity.js");
    const MovePath_js_1 = require("./Path/MovePath.js");
    const MoveTrail_js_1 = require("./MoveTrail.js");
    const OutModes_js_1 = require("./OutModes.js");
    const Spin_js_1 = require("./Spin.js");
    const NumberUtils_js_1 = require("../../../../Utils/NumberUtils.js");
    class Move {
        constructor() {
            this.angle = new MoveAngle_js_1.MoveAngle();
            this.attract = new MoveAttract_js_1.MoveAttract();
            this.center = new MoveCenter_js_1.MoveCenter();
            this.decay = 0;
            this.distance = {};
            this.direction = MoveDirection_js_1.MoveDirection.none;
            this.drift = 0;
            this.enable = false;
            this.gravity = new MoveGravity_js_1.MoveGravity();
            this.path = new MovePath_js_1.MovePath();
            this.outModes = new OutModes_js_1.OutModes();
            this.random = false;
            this.size = false;
            this.speed = 2;
            this.spin = new Spin_js_1.Spin();
            this.straight = false;
            this.trail = new MoveTrail_js_1.MoveTrail();
            this.vibrate = false;
            this.warp = false;
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            this.angle.load((0, TypeUtils_js_1.isNumber)(data.angle) ? { value: data.angle } : data.angle);
            this.attract.load(data.attract);
            this.center.load(data.center);
            if (data.decay !== undefined) {
                this.decay = (0, NumberUtils_js_1.setRangeValue)(data.decay);
            }
            if (data.direction !== undefined) {
                this.direction = data.direction;
            }
            if (data.distance !== undefined) {
                this.distance = (0, TypeUtils_js_1.isNumber)(data.distance)
                    ? {
                        horizontal: data.distance,
                        vertical: data.distance,
                    }
                    : { ...data.distance };
            }
            if (data.drift !== undefined) {
                this.drift = (0, NumberUtils_js_1.setRangeValue)(data.drift);
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            this.gravity.load(data.gravity);
            const outModes = data.outModes;
            if (outModes !== undefined) {
                if ((0, TypeUtils_js_1.isObject)(outModes)) {
                    this.outModes.load(outModes);
                }
                else {
                    this.outModes.load({
                        default: outModes,
                    });
                }
            }
            this.path.load(data.path);
            if (data.random !== undefined) {
                this.random = data.random;
            }
            if (data.size !== undefined) {
                this.size = data.size;
            }
            if (data.speed !== undefined) {
                this.speed = (0, NumberUtils_js_1.setRangeValue)(data.speed);
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
