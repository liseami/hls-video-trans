(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Utils/Utils", "./Canvas", "./Utils/EventListeners", "../Options/Classes/Options", "./Particles", "./Retina", "./Utils/Constants", "../Utils/NumberUtils", "../Utils/OptionsUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Container = void 0;
    const Utils_1 = require("../Utils/Utils");
    const Canvas_1 = require("./Canvas");
    const EventListeners_1 = require("./Utils/EventListeners");
    const Options_1 = require("../Options/Classes/Options");
    const Particles_1 = require("./Particles");
    const Retina_1 = require("./Retina");
    const Constants_1 = require("./Utils/Constants");
    const NumberUtils_1 = require("../Utils/NumberUtils");
    const OptionsUtils_1 = require("../Utils/OptionsUtils");
    function guardCheck(container) {
        return container && !container.destroyed;
    }
    function initDelta(value, fpsLimit = 60, smooth = false) {
        return {
            value,
            factor: smooth ? 60 / fpsLimit : (60 * value) / 1000,
        };
    }
    function loadContainerOptions(engine, container, ...sourceOptionsArr) {
        const options = new Options_1.Options(engine, container);
        (0, OptionsUtils_1.loadOptions)(options, ...sourceOptionsArr);
        return options;
    }
    const defaultPathGeneratorKey = "default", defaultPathGenerator = {
        generate: (p) => p.velocity,
        init: () => {
        },
        update: () => {
        },
        reset: () => {
        },
    };
    class Container {
        constructor(engine, id, sourceOptions) {
            this.id = id;
            this._intersectionManager = (entries) => {
                if (!guardCheck(this) || !this.actualOptions.pauseOnOutsideViewport) {
                    return;
                }
                for (const entry of entries) {
                    if (entry.target !== this.interactivity.element) {
                        continue;
                    }
                    (entry.isIntersecting ? this.play : this.pause)();
                }
            };
            this._nextFrame = async (timestamp) => {
                try {
                    if (!this.smooth &&
                        this.lastFrameTime !== undefined &&
                        timestamp < this.lastFrameTime + 1000 / this.fpsLimit) {
                        this.draw(false);
                        return;
                    }
                    this.lastFrameTime ??= timestamp;
                    const delta = initDelta(timestamp - this.lastFrameTime, this.fpsLimit, this.smooth);
                    this.addLifeTime(delta.value);
                    this.lastFrameTime = timestamp;
                    if (delta.value > 1000) {
                        this.draw(false);
                        return;
                    }
                    await this.particles.draw(delta);
                    if (!this.alive()) {
                        this.destroy();
                        return;
                    }
                    if (this.getAnimationStatus()) {
                        this.draw(false);
                    }
                }
                catch (e) {
                    (0, Utils_1.getLogger)().error(`${Constants_1.errorPrefix} in animation loop`, e);
                }
            };
            this._engine = engine;
            this.fpsLimit = 120;
            this.smooth = false;
            this._delay = 0;
            this._duration = 0;
            this._lifeTime = 0;
            this._firstStart = true;
            this.started = false;
            this.destroyed = false;
            this._paused = true;
            this.lastFrameTime = 0;
            this.zLayers = 100;
            this.pageHidden = false;
            this._sourceOptions = sourceOptions;
            this._initialSourceOptions = sourceOptions;
            this.retina = new Retina_1.Retina(this);
            this.canvas = new Canvas_1.Canvas(this);
            this.particles = new Particles_1.Particles(this._engine, this);
            this.pathGenerators = new Map();
            this.interactivity = {
                mouse: {
                    clicking: false,
                    inside: false,
                },
            };
            this.plugins = new Map();
            this.drawers = new Map();
            this._options = loadContainerOptions(this._engine, this);
            this.actualOptions = loadContainerOptions(this._engine, this);
            this._eventListeners = new EventListeners_1.EventListeners(this);
            if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
                this._intersectionObserver = new IntersectionObserver((entries) => this._intersectionManager(entries));
            }
            this._engine.dispatchEvent("containerBuilt", { container: this });
        }
        get options() {
            return this._options;
        }
        get sourceOptions() {
            return this._sourceOptions;
        }
        addClickHandler(callback) {
            if (!guardCheck(this)) {
                return;
            }
            const el = this.interactivity.element;
            if (!el) {
                return;
            }
            const clickOrTouchHandler = (e, pos, radius) => {
                if (!guardCheck(this)) {
                    return;
                }
                const pxRatio = this.retina.pixelRatio, posRetina = {
                    x: pos.x * pxRatio,
                    y: pos.y * pxRatio,
                }, particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);
                callback(e, particles);
            };
            const clickHandler = (e) => {
                if (!guardCheck(this)) {
                    return;
                }
                const mouseEvent = e, pos = {
                    x: mouseEvent.offsetX || mouseEvent.clientX,
                    y: mouseEvent.offsetY || mouseEvent.clientY,
                };
                clickOrTouchHandler(e, pos, 1);
            };
            const touchStartHandler = () => {
                if (!guardCheck(this)) {
                    return;
                }
                touched = true;
                touchMoved = false;
            };
            const touchMoveHandler = () => {
                if (!guardCheck(this)) {
                    return;
                }
                touchMoved = true;
            };
            const touchEndHandler = (e) => {
                if (!guardCheck(this)) {
                    return;
                }
                if (touched && !touchMoved) {
                    const touchEvent = e;
                    let lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
                    if (!lastTouch) {
                        lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - 1];
                        if (!lastTouch) {
                            return;
                        }
                    }
                    const element = this.canvas.element, canvasRect = element ? element.getBoundingClientRect() : undefined, pos = {
                        x: lastTouch.clientX - (canvasRect ? canvasRect.left : 0),
                        y: lastTouch.clientY - (canvasRect ? canvasRect.top : 0),
                    };
                    clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
                }
                touched = false;
                touchMoved = false;
            };
            const touchCancelHandler = () => {
                if (!guardCheck(this)) {
                    return;
                }
                touched = false;
                touchMoved = false;
            };
            let touched = false, touchMoved = false;
            el.addEventListener("click", clickHandler);
            el.addEventListener("touchstart", touchStartHandler);
            el.addEventListener("touchmove", touchMoveHandler);
            el.addEventListener("touchend", touchEndHandler);
            el.addEventListener("touchcancel", touchCancelHandler);
        }
        addLifeTime(value) {
            this._lifeTime += value;
        }
        addPath(key, generator, override = false) {
            if (!guardCheck(this) || (!override && this.pathGenerators.has(key))) {
                return false;
            }
            this.pathGenerators.set(key, generator ?? defaultPathGenerator);
            return true;
        }
        alive() {
            return !this._duration || this._lifeTime <= this._duration;
        }
        destroy() {
            if (!guardCheck(this)) {
                return;
            }
            this.stop();
            this.particles.destroy();
            this.canvas.destroy();
            for (const [, drawer] of this.drawers) {
                drawer.destroy && drawer.destroy(this);
            }
            for (const key of this.drawers.keys()) {
                this.drawers.delete(key);
            }
            this._engine.plugins.destroy(this);
            this.destroyed = true;
            const mainArr = this._engine.dom(), idx = mainArr.findIndex((t) => t === this);
            if (idx >= 0) {
                mainArr.splice(idx, 1);
            }
            this._engine.dispatchEvent("containerDestroyed", { container: this });
        }
        draw(force) {
            if (!guardCheck(this)) {
                return;
            }
            let refreshTime = force;
            this._drawAnimationFrame = requestAnimationFrame(async (timestamp) => {
                if (refreshTime) {
                    this.lastFrameTime = undefined;
                    refreshTime = false;
                }
                await this._nextFrame(timestamp);
            });
        }
        async export(type, options = {}) {
            for (const [, plugin] of this.plugins) {
                if (!plugin.export) {
                    continue;
                }
                const res = await plugin.export(type, options);
                if (!res.supported) {
                    continue;
                }
                return res.blob;
            }
            (0, Utils_1.getLogger)().error(`${Constants_1.errorPrefix} - Export plugin with type ${type} not found`);
        }
        getAnimationStatus() {
            return !this._paused && !this.pageHidden && guardCheck(this);
        }
        handleClickMode(mode) {
            if (!guardCheck(this)) {
                return;
            }
            this.particles.handleClickMode(mode);
            for (const [, plugin] of this.plugins) {
                plugin.handleClickMode && plugin.handleClickMode(mode);
            }
        }
        async init() {
            if (!guardCheck(this)) {
                return;
            }
            const shapes = this._engine.plugins.getSupportedShapes();
            for (const type of shapes) {
                const drawer = this._engine.plugins.getShapeDrawer(type);
                if (drawer) {
                    this.drawers.set(type, drawer);
                }
            }
            this._options = loadContainerOptions(this._engine, this, this._initialSourceOptions, this.sourceOptions);
            this.actualOptions = loadContainerOptions(this._engine, this, this._options);
            const availablePlugins = this._engine.plugins.getAvailablePlugins(this);
            for (const [id, plugin] of availablePlugins) {
                this.plugins.set(id, plugin);
            }
            this.retina.init();
            await this.canvas.init();
            this.updateActualOptions();
            this.canvas.initBackground();
            this.canvas.resize();
            this.zLayers = this.actualOptions.zLayers;
            this._duration = (0, NumberUtils_1.getRangeValue)(this.actualOptions.duration) * 1000;
            this._delay = (0, NumberUtils_1.getRangeValue)(this.actualOptions.delay) * 1000;
            this._lifeTime = 0;
            this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 120;
            this.smooth = this.actualOptions.smooth;
            for (const [, drawer] of this.drawers) {
                drawer.init && (await drawer.init(this));
            }
            for (const [, plugin] of this.plugins) {
                plugin.init && (await plugin.init());
            }
            this._engine.dispatchEvent("containerInit", { container: this });
            this.particles.init();
            this.particles.setDensity();
            for (const [, plugin] of this.plugins) {
                plugin.particlesSetup && plugin.particlesSetup();
            }
            this._engine.dispatchEvent("particlesSetup", { container: this });
        }
        async loadTheme(name) {
            if (!guardCheck(this)) {
                return;
            }
            this._currentTheme = name;
            await this.refresh();
        }
        pause() {
            if (!guardCheck(this)) {
                return;
            }
            if (this._drawAnimationFrame !== undefined) {
                cancelAnimationFrame(this._drawAnimationFrame);
                delete this._drawAnimationFrame;
            }
            if (this._paused) {
                return;
            }
            for (const [, plugin] of this.plugins) {
                plugin.pause && plugin.pause();
            }
            if (!this.pageHidden) {
                this._paused = true;
            }
            this._engine.dispatchEvent("containerPaused", { container: this });
        }
        play(force) {
            if (!guardCheck(this)) {
                return;
            }
            const needsUpdate = this._paused || force;
            if (this._firstStart && !this.actualOptions.autoPlay) {
                this._firstStart = false;
                return;
            }
            if (this._paused) {
                this._paused = false;
            }
            if (needsUpdate) {
                for (const [, plugin] of this.plugins) {
                    if (plugin.play) {
                        plugin.play();
                    }
                }
            }
            this._engine.dispatchEvent("containerPlay", { container: this });
            this.draw(needsUpdate || false);
        }
        async refresh() {
            if (!guardCheck(this)) {
                return;
            }
            this.stop();
            return this.start();
        }
        async reset() {
            if (!guardCheck(this)) {
                return;
            }
            this._initialSourceOptions = undefined;
            this._options = loadContainerOptions(this._engine, this);
            this.actualOptions = loadContainerOptions(this._engine, this, this._options);
            return this.refresh();
        }
        setNoise(noiseOrGenerator, init, update) {
            if (!guardCheck(this)) {
                return;
            }
            this.setPath(noiseOrGenerator, init, update);
        }
        setPath(pathOrGenerator, init, update) {
            if (!pathOrGenerator || !guardCheck(this)) {
                return;
            }
            const pathGenerator = { ...defaultPathGenerator };
            if ((0, Utils_1.isFunction)(pathOrGenerator)) {
                pathGenerator.generate = pathOrGenerator;
                if (init) {
                    pathGenerator.init = init;
                }
                if (update) {
                    pathGenerator.update = update;
                }
            }
            else {
                const oldGenerator = pathGenerator;
                pathGenerator.generate = pathOrGenerator.generate || oldGenerator.generate;
                pathGenerator.init = pathOrGenerator.init || oldGenerator.init;
                pathGenerator.update = pathOrGenerator.update || oldGenerator.update;
            }
            this.addPath(defaultPathGeneratorKey, pathGenerator, true);
        }
        async start() {
            if (!guardCheck(this) || this.started) {
                return;
            }
            await this.init();
            this.started = true;
            await new Promise((resolve) => {
                this._delayTimeout = setTimeout(async () => {
                    this._eventListeners.addListeners();
                    if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
                        this._intersectionObserver.observe(this.interactivity.element);
                    }
                    for (const [, plugin] of this.plugins) {
                        plugin.start && (await plugin.start());
                    }
                    this._engine.dispatchEvent("containerStarted", { container: this });
                    this.play();
                    resolve();
                }, this._delay);
            });
        }
        stop() {
            if (!guardCheck(this) || !this.started) {
                return;
            }
            if (this._delayTimeout) {
                clearTimeout(this._delayTimeout);
                delete this._delayTimeout;
            }
            this._firstStart = true;
            this.started = false;
            this._eventListeners.removeListeners();
            this.pause();
            this.particles.clear();
            this.canvas.stop();
            if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
                this._intersectionObserver.unobserve(this.interactivity.element);
            }
            for (const [, plugin] of this.plugins) {
                plugin.stop && plugin.stop();
            }
            for (const key of this.plugins.keys()) {
                this.plugins.delete(key);
            }
            this._sourceOptions = this._options;
            this._engine.dispatchEvent("containerStopped", { container: this });
        }
        updateActualOptions() {
            this.actualOptions.responsive = [];
            const newMaxWidth = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this._options);
            this.actualOptions.setTheme(this._currentTheme);
            if (this.responsiveMaxWidth === newMaxWidth) {
                return false;
            }
            this.responsiveMaxWidth = newMaxWidth;
            return true;
        }
    }
    exports.Container = Container;
});
