(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./GrabLinks.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Grab = void 0;
    const engine_1 = require("@tsparticles/engine");
    const GrabLinks_js_1 = require("./GrabLinks.js");
    class Grab {
        constructor() {
            this.distance = 100;
            this.links = new GrabLinks_js_1.GrabLinks();
        }
        load(data) {
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }
            this.links.load(data.links);
        }
    }
    exports.Grab = Grab;
});
