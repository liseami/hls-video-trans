(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ParticlesBounceFactor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParticlesBounce = void 0;
    const ParticlesBounceFactor_1 = require("./ParticlesBounceFactor");
    class ParticlesBounce {
        constructor() {
            this.horizontal = new ParticlesBounceFactor_1.ParticlesBounceFactor();
            this.vertical = new ParticlesBounceFactor_1.ParticlesBounceFactor();
        }
        load(data) {
            if (!data) {
                return;
            }
            this.horizontal.load(data.horizontal);
            this.vertical.load(data.vertical);
        }
    }
    exports.ParticlesBounce = ParticlesBounce;
});
