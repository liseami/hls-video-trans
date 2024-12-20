(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.divBounce = divBounce;
    exports.mouseBounce = mouseBounce;
    const engine_1 = require("@tsparticles/engine");
    const squareExp = 2, half = 0.5, halfPI = Math.PI * half, double = 2, toleranceFactor = 10, minRadius = 0;
    function processBounce(container, position, radius, area, enabledCb) {
        const query = container.particles.quadTree.query(area, enabledCb);
        for (const particle of query) {
            if (area instanceof engine_1.Circle) {
                (0, engine_1.circleBounce)((0, engine_1.circleBounceDataFromParticle)(particle), {
                    position,
                    radius,
                    mass: radius ** squareExp * halfPI,
                    velocity: engine_1.Vector.origin,
                    factor: engine_1.Vector.origin,
                });
            }
            else if (area instanceof engine_1.Rectangle) {
                (0, engine_1.rectBounce)(particle, (0, engine_1.calculateBounds)(position, radius));
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
            }, radius = elem.offsetWidth * half * pxRatio, tolerance = toleranceFactor * pxRatio, area = div.type === engine_1.DivType.circle
                ? new engine_1.Circle(pos.x, pos.y, radius + tolerance)
                : new engine_1.Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * double, elem.offsetHeight * pxRatio + tolerance * double);
            bounceCb(pos, radius, area);
        });
    }
    function divBounce(container, divs, bounceMode, enabledCb) {
        (0, engine_1.divModeExecute)(bounceMode, divs, (selector, div) => singleSelectorBounce(container, selector, div, (pos, radius, area) => processBounce(container, pos, radius, area, enabledCb)));
    }
    function mouseBounce(container, enabledCb) {
        const pxRatio = container.retina.pixelRatio, tolerance = toleranceFactor * pxRatio, mousePos = container.interactivity.mouse.position, radius = container.retina.bounceModeDistance;
        if (!radius || radius < minRadius || !mousePos) {
            return;
        }
        processBounce(container, mousePos, radius, new engine_1.Circle(mousePos.x, mousePos.y, radius + tolerance), enabledCb);
    }
});
