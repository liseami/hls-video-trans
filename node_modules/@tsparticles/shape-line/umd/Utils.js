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
    exports.drawLine = drawLine;
    function drawLine(data) {
        const { context, particle, radius } = data, shapeData = particle.shapeData, centerY = 0;
        context.moveTo(-radius, centerY);
        context.lineTo(radius, centerY);
        context.lineCap = shapeData?.cap ?? "butt";
    }
});
