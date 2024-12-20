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
    exports.drawEmoji = drawEmoji;
    function drawEmoji(data, image) {
        const { context, opacity } = data, half = 0.5, previousAlpha = context.globalAlpha;
        if (!image) {
            return;
        }
        const diameter = image.width, radius = diameter * half;
        context.globalAlpha = opacity;
        context.drawImage(image, -radius, -radius, diameter, diameter);
        context.globalAlpha = previousAlpha;
    }
});
