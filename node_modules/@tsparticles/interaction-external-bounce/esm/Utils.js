import { Circle, DivType, Rectangle, Vector, calculateBounds, circleBounce, circleBounceDataFromParticle, divModeExecute, rectBounce, } from "@tsparticles/engine";
const squareExp = 2, half = 0.5, halfPI = Math.PI * half, double = 2, toleranceFactor = 10, minRadius = 0;
function processBounce(container, position, radius, area, enabledCb) {
    const query = container.particles.quadTree.query(area, enabledCb);
    for (const particle of query) {
        if (area instanceof Circle) {
            circleBounce(circleBounceDataFromParticle(particle), {
                position,
                radius,
                mass: radius ** squareExp * halfPI,
                velocity: Vector.origin,
                factor: Vector.origin,
            });
        }
        else if (area instanceof Rectangle) {
            rectBounce(particle, calculateBounds(position, radius));
        }
    }
}
function singleSelectorBounce(container, selector, div, bounceCb) {
    const query = document.querySelectorAll(selector);
    if (!query.length) {
        return;
    }
    query.forEach(item => {
        const elem = item, pxRatio = container.retina.pixelRatio, pos = {
            x: (elem.offsetLeft + elem.offsetWidth * half) * pxRatio,
            y: (elem.offsetTop + elem.offsetHeight * half) * pxRatio,
        }, radius = elem.offsetWidth * half * pxRatio, tolerance = toleranceFactor * pxRatio, area = div.type === DivType.circle
            ? new Circle(pos.x, pos.y, radius + tolerance)
            : new Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * double, elem.offsetHeight * pxRatio + tolerance * double);
        bounceCb(pos, radius, area);
    });
}
export function divBounce(container, divs, bounceMode, enabledCb) {
    divModeExecute(bounceMode, divs, (selector, div) => singleSelectorBounce(container, selector, div, (pos, radius, area) => processBounce(container, pos, radius, area, enabledCb)));
}
export function mouseBounce(container, enabledCb) {
    const pxRatio = container.retina.pixelRatio, tolerance = toleranceFactor * pxRatio, mousePos = container.interactivity.mouse.position, radius = container.retina.bounceModeDistance;
    if (!radius || radius < minRadius || !mousePos) {
        return;
    }
    processBounce(container, mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance), enabledCb);
}
