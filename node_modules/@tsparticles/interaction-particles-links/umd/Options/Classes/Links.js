(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./LinksShadow.js", "./LinksTriangle.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Links = void 0;
    const engine_1 = require("@tsparticles/engine");
    const LinksShadow_js_1 = require("./LinksShadow.js");
    const LinksTriangle_js_1 = require("./LinksTriangle.js");
    class Links {
        constructor() {
            this.blink = false;
            this.color = new engine_1.OptionsColor();
            this.color.value = "#fff";
            this.consent = false;
            this.distance = 100;
            this.enable = false;
            this.frequency = 1;
            this.opacity = 1;
            this.shadow = new LinksShadow_js_1.LinksShadow();
            this.triangles = new LinksTriangle_js_1.LinksTriangle();
            this.width = 1;
            this.warp = false;
        }
        load(data) {
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            if (data.id !== undefined) {
                this.id = data.id;
            }
            if (data.blink !== undefined) {
                this.blink = data.blink;
            }
            this.color = engine_1.OptionsColor.create(this.color, data.color);
            if (data.consent !== undefined) {
                this.consent = data.consent;
            }
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.frequency !== undefined) {
                this.frequency = data.frequency;
            }
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
            this.shadow.load(data.shadow);
            this.triangles.load(data.triangles);
            if (data.width !== undefined) {
                this.width = data.width;
            }
            if (data.warp !== undefined) {
                this.warp = data.warp;
            }
        }
    }
    exports.Links = Links;
});
