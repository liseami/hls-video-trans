(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MoveAttract = void 0;
    const NumberUtils_1 = require("../../../../Utils/NumberUtils");
    class MoveAttract {
        constructor() {
            this.distance = 200;
            this.enable = false;
            this.rotate = {
                x: 3000,
                y: 3000,
            };
        }
        get rotateX() {
            return this.rotate.x;
        }
        set rotateX(value) {
            this.rotate.x = value;
        }
        get rotateY() {
            return this.rotate.y;
        }
        set rotateY(value) {
            this.rotate.y = value;
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.distance !== undefined) {
                this.distance = (0, NumberUtils_1.setRangeValue)(data.distance);
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            const rotateX = data.rotate?.x ?? data.rotateX;
            if (rotateX !== undefined) {
                this.rotate.x = rotateX;
            }
            const rotateY = data.rotate?.y ?? data.rotateY;
            if (rotateY !== undefined) {
                this.rotate.y = rotateY;
            }
        }
    }
    exports.MoveAttract = MoveAttract;
});
