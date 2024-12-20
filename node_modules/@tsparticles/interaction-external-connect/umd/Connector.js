(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./Options/Classes/Connect.js", "./Utils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Connector = void 0;
    const engine_1 = require("@tsparticles/engine");
    const Connect_js_1 = require("./Options/Classes/Connect.js");
    const Utils_js_1 = require("./Utils.js");
    const connectMode = "connect", minDistance = 0;
    class Connector extends engine_1.ExternalInteractorBase {
        constructor(container) {
            super(container);
        }
        clear() {
        }
        init() {
            const container = this.container, connect = container.actualOptions.interactivity.modes.connect;
            if (!connect) {
                return;
            }
            container.retina.connectModeDistance = connect.distance * container.retina.pixelRatio;
            container.retina.connectModeRadius = connect.radius * container.retina.pixelRatio;
        }
        interact() {
            const container = this.container, options = container.actualOptions;
            if (options.interactivity.events.onHover.enable && container.interactivity.status === "pointermove") {
                const mousePos = container.interactivity.mouse.position, { connectModeDistance, connectModeRadius } = container.retina;
                if (!connectModeDistance ||
                    connectModeDistance < minDistance ||
                    !connectModeRadius ||
                    connectModeRadius < minDistance ||
                    !mousePos) {
                    return;
                }
                const distance = Math.abs(connectModeRadius), query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p));
                query.forEach((p1, i) => {
                    const pos1 = p1.getPosition(), indexOffset = 1;
                    for (const p2 of query.slice(i + indexOffset)) {
                        const pos2 = p2.getPosition(), distMax = Math.abs(connectModeDistance), xDiff = Math.abs(pos1.x - pos2.x), yDiff = Math.abs(pos1.y - pos2.y);
                        if (xDiff < distMax && yDiff < distMax) {
                            (0, Utils_js_1.drawConnection)(container, p1, p2);
                        }
                    }
                });
            }
        }
        isEnabled(particle) {
            const container = this.container, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? container.actualOptions.interactivity).events;
            if (!(events.onHover.enable && mouse.position)) {
                return false;
            }
            return (0, engine_1.isInArray)(connectMode, events.onHover.mode);
        }
        loadModeOptions(options, ...sources) {
            if (!options.connect) {
                options.connect = new Connect_js_1.Connect();
            }
            for (const source of sources) {
                options.connect.load(source?.connect);
            }
        }
        reset() {
        }
    }
    exports.Connector = Connector;
});
