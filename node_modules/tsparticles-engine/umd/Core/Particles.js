(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Utils/Utils", "./Utils/InteractionManager", "./Particle", "./Utils/Point", "./Utils/QuadTree", "./Utils/Rectangle", "./Utils/Constants"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Particles = void 0;
    const Utils_1 = require("../Utils/Utils");
    const InteractionManager_1 = require("./Utils/InteractionManager");
    const Particle_1 = require("./Particle");
    const Point_1 = require("./Utils/Point");
    const QuadTree_1 = require("./Utils/QuadTree");
    const Rectangle_1 = require("./Utils/Rectangle");
    const Constants_1 = require("./Utils/Constants");
    const qTreeCapacity = 4;
    const qTreeRectangle = (canvasSize) => {
        return new Rectangle_1.Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, (canvasSize.width * 3) / 2, (canvasSize.height * 3) / 2);
    };
    class Particles {
        constructor(engine, container) {
            this._applyDensity = (options, manualCount, group) => {
                if (!options.number.density?.enable) {
                    return;
                }
                const numberOptions = options.number, densityFactor = this._initDensityFactor(numberOptions.density), optParticlesNumber = numberOptions.value, optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber, particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount, particlesCount = Math.min(this.count, this.filter((t) => t.group === group).length);
                this.limit = numberOptions.limit * densityFactor;
                if (particlesCount < particlesNumber) {
                    this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
                }
                else if (particlesCount > particlesNumber) {
                    this.removeQuantity(particlesCount - particlesNumber, group);
                }
            };
            this._initDensityFactor = (densityOptions) => {
                const container = this._container;
                if (!container.canvas.element || !densityOptions.enable) {
                    return 1;
                }
                const canvas = container.canvas.element, pxRatio = container.retina.pixelRatio;
                return (canvas.width * canvas.height) / (densityOptions.factor * pxRatio ** 2 * densityOptions.area);
            };
            this._pushParticle = (position, overrideOptions, group, initializer) => {
                try {
                    let particle = this.pool.pop();
                    if (particle) {
                        particle.init(this._nextId, position, overrideOptions, group);
                    }
                    else {
                        particle = new Particle_1.Particle(this._engine, this._nextId, this._container, position, overrideOptions, group);
                    }
                    let canAdd = true;
                    if (initializer) {
                        canAdd = initializer(particle);
                    }
                    if (!canAdd) {
                        return;
                    }
                    this._array.push(particle);
                    this._zArray.push(particle);
                    this._nextId++;
                    this._engine.dispatchEvent("particleAdded", {
                        container: this._container,
                        data: {
                            particle,
                        },
                    });
                    return particle;
                }
                catch (e) {
                    (0, Utils_1.getLogger)().warning(`${Constants_1.errorPrefix} adding particle: ${e}`);
                    return;
                }
            };
            this._removeParticle = (index, group, override) => {
                const particle = this._array[index];
                if (!particle || particle.group !== group) {
                    return false;
                }
                particle.destroy(override);
                const zIdx = this._zArray.indexOf(particle);
                this._array.splice(index, 1);
                this._zArray.splice(zIdx, 1);
                this.pool.push(particle);
                this._engine.dispatchEvent("particleRemoved", {
                    container: this._container,
                    data: {
                        particle,
                    },
                });
                return true;
            };
            this._engine = engine;
            this._container = container;
            this._nextId = 0;
            this._array = [];
            this._zArray = [];
            this.pool = [];
            this.limit = 0;
            this.needsSort = false;
            this.lastZIndex = 0;
            this._interactionManager = new InteractionManager_1.InteractionManager(engine, container);
            const canvasSize = container.canvas.size;
            this.quadTree = new QuadTree_1.QuadTree(qTreeRectangle(canvasSize), qTreeCapacity);
            this.movers = this._engine.plugins.getMovers(container, true);
            this.updaters = this._engine.plugins.getUpdaters(container, true);
        }
        get count() {
            return this._array.length;
        }
        addManualParticles() {
            const container = this._container, options = container.actualOptions;
            for (const particle of options.manualParticles) {
                this.addParticle(particle.position ? (0, Utils_1.getPosition)(particle.position, container.canvas.size) : undefined, particle.options);
            }
        }
        addParticle(position, overrideOptions, group, initializer) {
            const container = this._container, options = container.actualOptions, limit = options.particles.number.limit;
            if (limit > 0) {
                const countToRemove = this.count + 1 - limit;
                if (countToRemove > 0) {
                    this.removeQuantity(countToRemove);
                }
            }
            return this._pushParticle(position, overrideOptions, group, initializer);
        }
        clear() {
            this._array = [];
            this._zArray = [];
        }
        destroy() {
            this._array = [];
            this._zArray = [];
            this.movers = [];
            this.updaters = [];
        }
        async draw(delta) {
            const container = this._container;
            container.canvas.clear();
            await this.update(delta);
            for (const [, plugin] of container.plugins) {
                container.canvas.drawPlugin(plugin, delta);
            }
            for (const p of this._zArray) {
                p.draw(delta);
            }
        }
        filter(condition) {
            return this._array.filter(condition);
        }
        find(condition) {
            return this._array.find(condition);
        }
        handleClickMode(mode) {
            this._interactionManager.handleClickMode(mode);
        }
        init() {
            const container = this._container, options = container.actualOptions;
            this.lastZIndex = 0;
            this.needsSort = false;
            let handled = false;
            this.updaters = this._engine.plugins.getUpdaters(container, true);
            this._interactionManager.init();
            for (const [, plugin] of container.plugins) {
                if (plugin.particlesInitialization !== undefined) {
                    handled = plugin.particlesInitialization();
                }
                if (handled) {
                    break;
                }
            }
            this._interactionManager.init();
            for (const [, pathGenerator] of container.pathGenerators) {
                pathGenerator.init(container);
            }
            this.addManualParticles();
            if (!handled) {
                for (const group in options.particles.groups) {
                    const groupOptions = options.particles.groups[group];
                    for (let i = this.count, j = 0; j < groupOptions.number?.value && i < options.particles.number.value; i++, j++) {
                        this.addParticle(undefined, groupOptions, group);
                    }
                }
                for (let i = this.count; i < options.particles.number.value; i++) {
                    this.addParticle();
                }
            }
        }
        push(nb, mouse, overrideOptions, group) {
            this.pushing = true;
            for (let i = 0; i < nb; i++) {
                this.addParticle(mouse?.position, overrideOptions, group);
            }
            this.pushing = false;
        }
        async redraw() {
            this.clear();
            this.init();
            await this.draw({ value: 0, factor: 0 });
        }
        remove(particle, group, override) {
            this.removeAt(this._array.indexOf(particle), undefined, group, override);
        }
        removeAt(index, quantity = 1, group, override) {
            if (index < 0 || index > this.count) {
                return;
            }
            let deleted = 0;
            for (let i = index; deleted < quantity && i < this.count; i++) {
                this._removeParticle(i--, group, override) && deleted++;
            }
        }
        removeQuantity(quantity, group) {
            this.removeAt(0, quantity, group);
        }
        setDensity() {
            const options = this._container.actualOptions, groups = options.particles.groups;
            for (const group in groups) {
                this._applyDensity(groups[group], 0, group);
            }
            this._applyDensity(options.particles, options.manualParticles.length);
        }
        async update(delta) {
            const container = this._container, particlesToDelete = new Set();
            this.quadTree = new QuadTree_1.QuadTree(qTreeRectangle(container.canvas.size), qTreeCapacity);
            for (const [, pathGenerator] of container.pathGenerators) {
                pathGenerator.update();
            }
            for (const [, plugin] of container.plugins) {
                plugin.update && plugin.update(delta);
            }
            for (const particle of this._array) {
                const resizeFactor = container.canvas.resizeFactor;
                if (resizeFactor && !particle.ignoresResizeRatio) {
                    particle.position.x *= resizeFactor.width;
                    particle.position.y *= resizeFactor.height;
                    particle.initialPosition.x *= resizeFactor.width;
                    particle.initialPosition.y *= resizeFactor.height;
                }
                particle.ignoresResizeRatio = false;
                await this._interactionManager.reset(particle);
                for (const [, plugin] of this._container.plugins) {
                    if (particle.destroyed) {
                        break;
                    }
                    if (plugin.particleUpdate) {
                        plugin.particleUpdate(particle, delta);
                    }
                }
                for (const mover of this.movers) {
                    mover.isEnabled(particle) && mover.move(particle, delta);
                }
                if (particle.destroyed) {
                    particlesToDelete.add(particle);
                    continue;
                }
                this.quadTree.insert(new Point_1.Point(particle.getPosition(), particle));
            }
            if (particlesToDelete.size) {
                const checkDelete = (p) => !particlesToDelete.has(p);
                this._array = this.filter(checkDelete);
                this._zArray = this._zArray.filter(checkDelete);
                this.pool.push(...particlesToDelete);
            }
            await this._interactionManager.externalInteract(delta);
            for (const particle of this._array) {
                for (const updater of this.updaters) {
                    updater.update(particle, delta);
                }
                if (!particle.destroyed && !particle.spawning) {
                    await this._interactionManager.particlesInteract(particle, delta);
                }
            }
            delete container.canvas.resizeFactor;
            if (this.needsSort) {
                const zArray = this._zArray;
                zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
                this.lastZIndex = zArray[zArray.length - 1].position.z;
                this.needsSort = false;
            }
        }
    }
    exports.Particles = Particles;
});
