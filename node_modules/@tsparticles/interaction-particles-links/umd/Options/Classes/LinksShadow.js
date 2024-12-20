(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinksShadow = void 0;
    const engine_1 = require("@tsparticles/engine");
    class LinksShadow {
        constructor() {
            this.blur = 5;
            this.color = new engine_1.OptionsColor();
            this.color.value = "#000";
            this.enable = false;
        }
        load(data) {
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            if (data.blur !== undefined) {
                this.blur = data.blur;
            }
            this.color = engine_1.OptionsColor.create(this.color, data.color);
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
        }
    }
    exports.LinksShadow = LinksShadow;
});
