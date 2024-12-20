(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RangedAnimationOptions = exports.AnimationOptions = void 0;
    const NumberUtils_1 = require("../../Utils/NumberUtils");
    class AnimationOptions {
        constructor() {
            this.count = 0;
            this.enable = false;
            this.speed = 1;
            this.decay = 0;
            this.delay = 0;
            this.sync = false;
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.count !== undefined) {
                this.count = (0, NumberUtils_1.setRangeValue)(data.count);
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.speed !== undefined) {
                this.speed = (0, NumberUtils_1.setRangeValue)(data.speed);
            }
            if (data.decay !== undefined) {
                this.decay = (0, NumberUtils_1.setRangeValue)(data.decay);
            }
            if (data.delay !== undefined) {
                this.delay = (0, NumberUtils_1.setRangeValue)(data.delay);
            }
            if (data.sync !== undefined) {
                this.sync = data.sync;
            }
        }
    }
    exports.AnimationOptions = AnimationOptions;
    class RangedAnimationOptions extends AnimationOptions {
        constructor() {
            super();
            this.mode = "auto";
            this.startValue = "random";
        }
        load(data) {
            super.load(data);
            if (!data) {
                return;
            }
            if (data.minimumValue !== undefined) {
                this.minimumValue = data.minimumValue;
            }
            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
            if (data.startValue !== undefined) {
                this.startValue = data.startValue;
            }
        }
    }
    exports.RangedAnimationOptions = RangedAnimationOptions;
});
