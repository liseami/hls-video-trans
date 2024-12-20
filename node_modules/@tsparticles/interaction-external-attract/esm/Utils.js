import { Circle, Vector, clamp, getDistances, } from "@tsparticles/engine";
const minFactor = 1, identity = 1, minRadius = 0;
function processAttract(engine, container, position, attractRadius, area, queryCb) {
    const attractOptions = container.actualOptions.interactivity.modes.attract;
    if (!attractOptions) {
        return;
    }
    const query = container.particles.quadTree.query(area, queryCb);
    for (const particle of query) {
        const { dx, dy, distance } = getDistances(particle.position, position), velocity = attractOptions.speed * attractOptions.factor, attractFactor = clamp(engine.getEasing(attractOptions.easing)(identity - distance / attractRadius) * velocity, minFactor, attractOptions.maxSpeed), normVec = Vector.create(!distance ? velocity : (dx / distance) * attractFactor, !distance ? velocity : (dy / distance) * attractFactor);
        particle.position.subFrom(normVec);
    }
}
export function clickAttract(engine, container, enabledCb) {
    if (!container.attract) {
        container.attract = { particles: [] };
    }
    const { attract } = container;
    if (!attract.finish) {
        if (!attract.count) {
            attract.count = 0;
        }
        attract.count++;
        if (attract.count === container.particles.count) {
            attract.finish = true;
        }
    }
    if (attract.clicking) {
        const mousePos = container.interactivity.mouse.clickPosition, attractRadius = container.retina.attractModeDistance;
        if (!attractRadius || attractRadius < minRadius || !mousePos) {
            return;
        }
        processAttract(engine, container, mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius), (p) => enabledCb(p));
    }
    else if (attract.clicking === false) {
        attract.particles = [];
    }
}
export function hoverAttract(engine, container, enabledCb) {
    const mousePos = container.interactivity.mouse.position, attractRadius = container.retina.attractModeDistance;
    if (!attractRadius || attractRadius < minRadius || !mousePos) {
        return;
    }
    processAttract(engine, container, mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius), (p) => enabledCb(p));
}
