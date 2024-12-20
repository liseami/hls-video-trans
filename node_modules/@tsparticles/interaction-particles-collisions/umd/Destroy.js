(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Bounce.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.destroy = destroy;
    const Bounce_js_1 = require("./Bounce.js");
    function destroy(p1, p2) {
        if (!p1.unbreakable && !p2.unbreakable) {
            (0, Bounce_js_1.bounce)(p1, p2);
        }
        if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
            p1.destroy();
        }
        else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
            p2.destroy();
        }
        else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
            const deleteP = p1.getRadius() >= p2.getRadius() ? p2 : p1;
            deleteP.destroy();
        }
    }
});
