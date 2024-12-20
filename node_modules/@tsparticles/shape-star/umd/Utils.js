(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.drawStar = drawStar;
    const defaultInset = 2, origin = { x: 0, y: 0 };
    function drawStar(data) {
        const { context, particle, radius } = data, sides = particle.sides, inset = particle.starInset ?? defaultInset;
        context.moveTo(origin.x, origin.y - radius);
        for (let i = 0; i < sides; i++) {
            context.rotate(Math.PI / sides);
            context.lineTo(origin.x, origin.y - radius * inset);
            context.rotate(Math.PI / sides);
            context.lineTo(origin.x, origin.y - radius);
        }
    }
});
