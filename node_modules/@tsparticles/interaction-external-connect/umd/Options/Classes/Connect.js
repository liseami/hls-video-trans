(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./ConnectLinks.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Connect = void 0;
    const engine_1 = require("@tsparticles/engine");
    const ConnectLinks_js_1 = require("./ConnectLinks.js");
    class Connect {
        constructor() {
            this.distance = 80;
            this.links = new ConnectLinks_js_1.ConnectLinks();
            this.radius = 60;
        }
        load(data) {
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }
            this.links.load(data.links);
            if (data.radius !== undefined) {
                this.radius = data.radius;
            }
        }
    }
    exports.Connect = Connect;
});
