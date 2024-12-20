(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ColorUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.alterHsl = exports.drawParticlePlugin = exports.drawPlugin = exports.drawShapeAfterEffect = exports.drawShape = exports.drawParticle = exports.clear = exports.paintImage = exports.paintBase = exports.drawTriangle = exports.drawLine = void 0;
    const ColorUtils_1 = require("./ColorUtils");
    function drawLine(context, begin, end) {
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.closePath();
    }
    exports.drawLine = drawLine;
    function drawTriangle(context, p1, p2, p3) {
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.closePath();
    }
    exports.drawTriangle = drawTriangle;
    function paintBase(context, dimension, baseColor) {
        context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
        context.fillRect(0, 0, dimension.width, dimension.height);
    }
    exports.paintBase = paintBase;
    function paintImage(context, dimension, image, opacity) {
        if (!image) {
            return;
        }
        context.globalAlpha = opacity;
        context.drawImage(image, 0, 0, dimension.width, dimension.height);
        context.globalAlpha = 1;
    }
    exports.paintImage = paintImage;
    function clear(context, dimension) {
        context.clearRect(0, 0, dimension.width, dimension.height);
    }
    exports.clear = clear;
    function drawParticle(data) {
        const { container, context, particle, delta, colorStyles, backgroundMask, composite, radius, opacity, shadow, transform, } = data;
        const pos = particle.getPosition(), angle = particle.rotation + (particle.pathRotation ? particle.velocity.angle : 0), rotateData = {
            sin: Math.sin(angle),
            cos: Math.cos(angle),
        }, transformData = {
            a: rotateData.cos * (transform.a ?? 1),
            b: rotateData.sin * (transform.b ?? 1),
            c: -rotateData.sin * (transform.c ?? 1),
            d: rotateData.cos * (transform.d ?? 1),
        };
        context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);
        context.beginPath();
        if (backgroundMask) {
            context.globalCompositeOperation = composite;
        }
        const shadowColor = particle.shadowColor;
        if (shadow.enable && shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = (0, ColorUtils_1.getStyleFromRgb)(shadowColor);
            context.shadowOffsetX = shadow.offset.x;
            context.shadowOffsetY = shadow.offset.y;
        }
        if (colorStyles.fill) {
            context.fillStyle = colorStyles.fill;
        }
        const strokeWidth = particle.strokeWidth ?? 0;
        context.lineWidth = strokeWidth;
        if (colorStyles.stroke) {
            context.strokeStyle = colorStyles.stroke;
        }
        drawShape(container, context, particle, radius, opacity, delta);
        if (strokeWidth > 0) {
            context.stroke();
        }
        if (particle.close) {
            context.closePath();
        }
        if (particle.fill) {
            context.fill();
        }
        drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
        context.globalCompositeOperation = "source-over";
        context.setTransform(1, 0, 0, 1, 0, 0);
    }
    exports.drawParticle = drawParticle;
    function drawShape(container, context, particle, radius, opacity, delta) {
        if (!particle.shape) {
            return;
        }
        const drawer = container.drawers.get(particle.shape);
        if (!drawer) {
            return;
        }
        drawer.draw(context, particle, radius, opacity, delta, container.retina.pixelRatio);
    }
    exports.drawShape = drawShape;
    function drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
        if (!particle.shape) {
            return;
        }
        const drawer = container.drawers.get(particle.shape);
        if (!drawer || !drawer.afterEffect) {
            return;
        }
        drawer.afterEffect(context, particle, radius, opacity, delta, container.retina.pixelRatio);
    }
    exports.drawShapeAfterEffect = drawShapeAfterEffect;
    function drawPlugin(context, plugin, delta) {
        if (!plugin.draw) {
            return;
        }
        plugin.draw(context, delta);
    }
    exports.drawPlugin = drawPlugin;
    function drawParticlePlugin(context, plugin, particle, delta) {
        if (!plugin.drawParticle) {
            return;
        }
        plugin.drawParticle(context, particle, delta);
    }
    exports.drawParticlePlugin = drawParticlePlugin;
    function alterHsl(color, type, value) {
        return {
            h: color.h,
            s: color.s,
            l: color.l + (type === "darken" ? -1 : 1) * value,
        };
    }
    exports.alterHsl = alterHsl;
});
