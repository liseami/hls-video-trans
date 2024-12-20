import { AlterType } from "../Enums/Types/AlterType.js";
import { getStyleFromRgb } from "./ColorUtils.js";
const origin = { x: 0, y: 0 }, defaultTransform = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
};
export function drawLine(context, begin, end) {
    context.beginPath();
    context.moveTo(begin.x, begin.y);
    context.lineTo(end.x, end.y);
    context.closePath();
}
export function paintBase(context, dimension, baseColor) {
    context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
    context.fillRect(origin.x, origin.y, dimension.width, dimension.height);
}
export function paintImage(context, dimension, image, opacity) {
    if (!image) {
        return;
    }
    context.globalAlpha = opacity;
    context.drawImage(image, origin.x, origin.y, dimension.width, dimension.height);
    context.globalAlpha = 1;
}
export function clear(context, dimension) {
    context.clearRect(origin.x, origin.y, dimension.width, dimension.height);
}
export function drawParticle(data) {
    const { container, context, particle, delta, colorStyles, backgroundMask, composite, radius, opacity, shadow, transform, } = data, pos = particle.getPosition(), defaultAngle = 0, angle = particle.rotation + (particle.pathRotation ? particle.velocity.angle : defaultAngle), rotateData = {
        sin: Math.sin(angle),
        cos: Math.cos(angle),
    }, rotating = !!angle, identity = 1, transformData = {
        a: rotateData.cos * (transform.a ?? defaultTransform.a),
        b: rotating ? rotateData.sin * (transform.b ?? identity) : (transform.b ?? defaultTransform.b),
        c: rotating ? -rotateData.sin * (transform.c ?? identity) : (transform.c ?? defaultTransform.c),
        d: rotateData.cos * (transform.d ?? defaultTransform.d),
    };
    context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);
    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }
    const shadowColor = particle.shadowColor;
    if (shadow.enable && shadowColor) {
        context.shadowBlur = shadow.blur;
        context.shadowColor = getStyleFromRgb(shadowColor);
        context.shadowOffsetX = shadow.offset.x;
        context.shadowOffsetY = shadow.offset.y;
    }
    if (colorStyles.fill) {
        context.fillStyle = colorStyles.fill;
    }
    const minStrokeWidth = 0, strokeWidth = particle.strokeWidth ?? minStrokeWidth;
    context.lineWidth = strokeWidth;
    if (colorStyles.stroke) {
        context.strokeStyle = colorStyles.stroke;
    }
    const drawData = {
        container,
        context,
        particle,
        radius,
        opacity,
        delta,
        transformData,
        strokeWidth,
    };
    drawShape(drawData);
    drawShapeAfterDraw(drawData);
    drawEffect(drawData);
    context.globalCompositeOperation = "source-over";
    context.resetTransform();
}
export function drawEffect(data) {
    const { container, context, particle, radius, opacity, delta, transformData } = data;
    if (!particle.effect) {
        return;
    }
    const drawer = container.effectDrawers.get(particle.effect);
    if (!drawer) {
        return;
    }
    drawer.draw({
        context,
        particle,
        radius,
        opacity,
        delta,
        pixelRatio: container.retina.pixelRatio,
        transformData: { ...transformData },
    });
}
export function drawShape(data) {
    const { container, context, particle, radius, opacity, delta, strokeWidth, transformData } = data, minStrokeWidth = 0;
    if (!particle.shape) {
        return;
    }
    const drawer = container.shapeDrawers.get(particle.shape);
    if (!drawer) {
        return;
    }
    context.beginPath();
    drawer.draw({
        context,
        particle,
        radius,
        opacity,
        delta,
        pixelRatio: container.retina.pixelRatio,
        transformData: { ...transformData },
    });
    if (particle.shapeClose) {
        context.closePath();
    }
    if (strokeWidth > minStrokeWidth) {
        context.stroke();
    }
    if (particle.shapeFill) {
        context.fill();
    }
}
export function drawShapeAfterDraw(data) {
    const { container, context, particle, radius, opacity, delta, transformData } = data;
    if (!particle.shape) {
        return;
    }
    const drawer = container.shapeDrawers.get(particle.shape);
    if (!drawer?.afterDraw) {
        return;
    }
    drawer.afterDraw({
        context,
        particle,
        radius,
        opacity,
        delta,
        pixelRatio: container.retina.pixelRatio,
        transformData: { ...transformData },
    });
}
export function drawPlugin(context, plugin, delta) {
    if (!plugin.draw) {
        return;
    }
    plugin.draw(context, delta);
}
export function drawParticlePlugin(context, plugin, particle, delta) {
    if (!plugin.drawParticle) {
        return;
    }
    plugin.drawParticle(context, particle, delta);
}
export function alterHsl(color, type, value) {
    const lFactor = 1;
    return {
        h: color.h,
        s: color.s,
        l: color.l + (type === AlterType.darken ? -lFactor : lFactor) * value,
    };
}
