"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linker = void 0;
const engine_1 = require("@tsparticles/engine");
const CircleWarp_js_1 = require("./CircleWarp.js");
const Links_js_1 = require("./Options/Classes/Links.js");
const squarePower = 2, opacityOffset = 1, origin = {
    x: 0,
    y: 0,
}, minDistance = 0;
function getLinkDistance(pos1, pos2, optDistance, canvasSize, warp) {
    const { dx, dy, distance } = (0, engine_1.getDistances)(pos1, pos2);
    if (!warp || distance <= optDistance) {
        return distance;
    }
    const absDiffs = {
        x: Math.abs(dx),
        y: Math.abs(dy),
    }, warpDistances = {
        x: Math.min(absDiffs.x, canvasSize.width - absDiffs.x),
        y: Math.min(absDiffs.y, canvasSize.height - absDiffs.y),
    };
    return Math.sqrt(warpDistances.x ** squarePower + warpDistances.y ** squarePower);
}
class Linker extends engine_1.ParticlesInteractorBase {
    constructor(container, engine) {
        super(container);
        this._setColor = p1 => {
            if (!p1.options.links) {
                return;
            }
            const container = this._linkContainer, linksOptions = p1.options.links;
            let linkColor = linksOptions.id === undefined
                ? container.particles.linksColor
                : container.particles.linksColors.get(linksOptions.id);
            if (linkColor) {
                return;
            }
            const optColor = linksOptions.color;
            linkColor = (0, engine_1.getLinkRandomColor)(this._engine, optColor, linksOptions.blink, linksOptions.consent);
            if (linksOptions.id === undefined) {
                container.particles.linksColor = linkColor;
            }
            else {
                container.particles.linksColors.set(linksOptions.id, linkColor);
            }
        };
        this._linkContainer = container;
        this._engine = engine;
    }
    clear() {
    }
    init() {
        this._linkContainer.particles.linksColor = undefined;
        this._linkContainer.particles.linksColors = new Map();
    }
    interact(p1) {
        if (!p1.options.links) {
            return;
        }
        p1.links = [];
        const pos1 = p1.getPosition(), container = this.container, canvasSize = container.canvas.size;
        if (pos1.x < origin.x || pos1.y < origin.y || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
            return;
        }
        const linkOpt1 = p1.options.links, optOpacity = linkOpt1.opacity, optDistance = p1.retina.linksDistance ?? minDistance, warp = linkOpt1.warp;
        let range;
        if (warp) {
            range = new CircleWarp_js_1.CircleWarp(pos1.x, pos1.y, optDistance, canvasSize);
        }
        else {
            range = new engine_1.Circle(pos1.x, pos1.y, optDistance);
        }
        const query = container.particles.quadTree.query(range);
        for (const p2 of query) {
            const linkOpt2 = p2.options.links;
            if (p1 === p2 ||
                !linkOpt2?.enable ||
                linkOpt1.id !== linkOpt2.id ||
                p2.spawning ||
                p2.destroyed ||
                !p2.links ||
                p1.links.some(t => t.destination === p2) ||
                p2.links.some(t => t.destination === p1)) {
                continue;
            }
            const pos2 = p2.getPosition();
            if (pos2.x < origin.x || pos2.y < origin.y || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
                continue;
            }
            const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);
            if (distance > optDistance) {
                continue;
            }
            const opacityLine = (opacityOffset - distance / optDistance) * optOpacity;
            this._setColor(p1);
            p1.links.push({
                destination: p2,
                opacity: opacityLine,
            });
        }
    }
    isEnabled(particle) {
        return !!particle.options.links?.enable;
    }
    loadParticlesOptions(options, ...sources) {
        if (!options.links) {
            options.links = new Links_js_1.Links();
        }
        for (const source of sources) {
            options.links.load(source?.links);
        }
    }
    reset() {
    }
}
exports.Linker = Linker;
