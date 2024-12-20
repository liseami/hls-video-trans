(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Utils/Constants", "../Utils/Utils", "./Container", "../Utils/EventDispatcher", "./Utils/Plugins", "../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Engine = void 0;
    const Constants_1 = require("./Utils/Constants");
    const Utils_1 = require("../Utils/Utils");
    const Container_1 = require("./Container");
    const EventDispatcher_1 = require("../Utils/EventDispatcher");
    const Plugins_1 = require("./Utils/Plugins");
    const NumberUtils_1 = require("../Utils/NumberUtils");
    async function getDataFromUrl(data) {
        const url = (0, Utils_1.itemFromSingleOrMultiple)(data.url, data.index);
        if (!url) {
            return data.fallback;
        }
        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        }
        (0, Utils_1.getLogger)().error(`${Constants_1.errorPrefix} ${response.status} while retrieving config file`);
        return data.fallback;
    }
    function isParamsEmpty(params) {
        return !params.id && !params.element && !params.url && !params.options;
    }
    function isParams(obj) {
        return !isParamsEmpty(obj);
    }
    class Engine {
        constructor() {
            this._configs = new Map();
            this._domArray = [];
            this._eventDispatcher = new EventDispatcher_1.EventDispatcher();
            this._initialized = false;
            this.plugins = new Plugins_1.Plugins(this);
        }
        get configs() {
            const res = {};
            for (const [name, config] of this._configs) {
                res[name] = config;
            }
            return res;
        }
        get version() {
            return "2.12.0";
        }
        addConfig(nameOrConfig, config) {
            if ((0, Utils_1.isString)(nameOrConfig)) {
                if (config) {
                    config.name = nameOrConfig;
                    this._configs.set(nameOrConfig, config);
                }
            }
            else {
                this._configs.set(nameOrConfig.name ?? "default", nameOrConfig);
            }
        }
        addEventListener(type, listener) {
            this._eventDispatcher.addEventListener(type, listener);
        }
        async addInteractor(name, interactorInitializer, refresh = true) {
            this.plugins.addInteractor(name, interactorInitializer);
            await this.refresh(refresh);
        }
        async addMover(name, moverInitializer, refresh = true) {
            this.plugins.addParticleMover(name, moverInitializer);
            await this.refresh(refresh);
        }
        async addParticleUpdater(name, updaterInitializer, refresh = true) {
            this.plugins.addParticleUpdater(name, updaterInitializer);
            await this.refresh(refresh);
        }
        async addPathGenerator(name, generator, refresh = true) {
            this.plugins.addPathGenerator(name, generator);
            await this.refresh(refresh);
        }
        async addPlugin(plugin, refresh = true) {
            this.plugins.addPlugin(plugin);
            await this.refresh(refresh);
        }
        async addPreset(preset, options, override = false, refresh = true) {
            this.plugins.addPreset(preset, options, override);
            await this.refresh(refresh);
        }
        async addShape(shape, drawer, initOrRefresh, afterEffectOrRefresh, destroyOrRefresh, refresh = true) {
            let customDrawer;
            let realRefresh = refresh, realInit, realAfterEffect, realDestroy;
            if ((0, Utils_1.isBoolean)(initOrRefresh)) {
                realRefresh = initOrRefresh;
                realInit = undefined;
            }
            else {
                realInit = initOrRefresh;
            }
            if ((0, Utils_1.isBoolean)(afterEffectOrRefresh)) {
                realRefresh = afterEffectOrRefresh;
                realAfterEffect = undefined;
            }
            else {
                realAfterEffect = afterEffectOrRefresh;
            }
            if ((0, Utils_1.isBoolean)(destroyOrRefresh)) {
                realRefresh = destroyOrRefresh;
                realDestroy = undefined;
            }
            else {
                realDestroy = destroyOrRefresh;
            }
            if ((0, Utils_1.isFunction)(drawer)) {
                customDrawer = {
                    afterEffect: realAfterEffect,
                    destroy: realDestroy,
                    draw: drawer,
                    init: realInit,
                };
            }
            else {
                customDrawer = drawer;
            }
            this.plugins.addShapeDrawer(shape, customDrawer);
            await this.refresh(realRefresh);
        }
        dispatchEvent(type, args) {
            this._eventDispatcher.dispatchEvent(type, args);
        }
        dom() {
            return this._domArray;
        }
        domItem(index) {
            const dom = this.dom(), item = dom[index];
            if (!item || item.destroyed) {
                dom.splice(index, 1);
                return;
            }
            return item;
        }
        init() {
            if (this._initialized) {
                return;
            }
            this._initialized = true;
        }
        async load(tagIdOrOptionsOrParams, options) {
            return this.loadFromArray(tagIdOrOptionsOrParams, options);
        }
        async loadFromArray(tagIdOrOptionsOrParams, optionsOrIndex, index) {
            let params;
            if (!isParams(tagIdOrOptionsOrParams)) {
                params = {};
                if ((0, Utils_1.isString)(tagIdOrOptionsOrParams)) {
                    params.id = tagIdOrOptionsOrParams;
                }
                else {
                    params.options = tagIdOrOptionsOrParams;
                }
                if ((0, Utils_1.isNumber)(optionsOrIndex)) {
                    params.index = optionsOrIndex;
                }
                else {
                    params.options = optionsOrIndex ?? params.options;
                }
                params.index = index ?? params.index;
            }
            else {
                params = tagIdOrOptionsOrParams;
            }
            return this._loadParams(params);
        }
        async loadJSON(tagId, pathConfigJson, index) {
            let url, id;
            if ((0, Utils_1.isNumber)(pathConfigJson) || pathConfigJson === undefined) {
                url = tagId;
            }
            else {
                id = tagId;
                url = pathConfigJson;
            }
            return this._loadParams({ id: id, url, index });
        }
        async refresh(refresh = true) {
            if (!refresh) {
                return;
            }
            this.dom().forEach((t) => t.refresh());
        }
        removeEventListener(type, listener) {
            this._eventDispatcher.removeEventListener(type, listener);
        }
        async set(id, element, options, index) {
            const params = { index };
            if ((0, Utils_1.isString)(id)) {
                params.id = id;
            }
            else {
                params.element = id;
            }
            if (element instanceof HTMLElement) {
                params.element = element;
            }
            else {
                params.options = element;
            }
            if ((0, Utils_1.isNumber)(options)) {
                params.index = options;
            }
            else {
                params.options = options ?? params.options;
            }
            return this._loadParams(params);
        }
        async setJSON(id, element, pathConfigJson, index) {
            const params = {};
            if (id instanceof HTMLElement) {
                params.element = id;
                params.url = element;
                params.index = pathConfigJson;
            }
            else {
                params.id = id;
                params.element = element;
                params.url = pathConfigJson;
                params.index = index;
            }
            return this._loadParams(params);
        }
        setOnClickHandler(callback) {
            const dom = this.dom();
            if (!dom.length) {
                throw new Error(`${Constants_1.errorPrefix} can only set click handlers after calling tsParticles.load()`);
            }
            for (const domItem of dom) {
                domItem.addClickHandler(callback);
            }
        }
        async _loadParams(params) {
            const id = params.id ?? `tsparticles${Math.floor((0, NumberUtils_1.getRandom)() * 10000)}`, { index, url } = params, options = url ? await getDataFromUrl({ fallback: params.options, url, index }) : params.options;
            let domContainer = params.element ?? document.getElementById(id);
            if (!domContainer) {
                domContainer = document.createElement("div");
                domContainer.id = id;
                document.body.append(domContainer);
            }
            const currentOptions = (0, Utils_1.itemFromSingleOrMultiple)(options, index), dom = this.dom(), oldIndex = dom.findIndex((v) => v.id === id);
            if (oldIndex >= 0) {
                const old = this.domItem(oldIndex);
                if (old && !old.destroyed) {
                    old.destroy();
                    dom.splice(oldIndex, 1);
                }
            }
            let canvasEl;
            if (domContainer.tagName.toLowerCase() === "canvas") {
                canvasEl = domContainer;
                canvasEl.dataset[Constants_1.generatedAttribute] = "false";
            }
            else {
                const existingCanvases = domContainer.getElementsByTagName("canvas");
                if (existingCanvases.length) {
                    canvasEl = existingCanvases[0];
                    canvasEl.dataset[Constants_1.generatedAttribute] = "false";
                }
                else {
                    canvasEl = document.createElement("canvas");
                    canvasEl.dataset[Constants_1.generatedAttribute] = "true";
                    domContainer.appendChild(canvasEl);
                }
            }
            if (!canvasEl.style.width) {
                canvasEl.style.width = "100%";
            }
            if (!canvasEl.style.height) {
                canvasEl.style.height = "100%";
            }
            const newItem = new Container_1.Container(this, id, currentOptions);
            if (oldIndex >= 0) {
                dom.splice(oldIndex, 0, newItem);
            }
            else {
                dom.push(newItem);
            }
            newItem.canvas.loadCanvas(canvasEl);
            await newItem.start();
            return newItem;
        }
    }
    exports.Engine = Engine;
});
