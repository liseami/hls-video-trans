import { errorPrefix, generatedAttribute } from "./Utils/Constants.js";
import { executeOnSingleOrMultiple, getLogger, itemFromSingleOrMultiple } from "../Utils/Utils.js";
import { Container } from "./Container.js";
import { EventDispatcher } from "../Utils/EventDispatcher.js";
import { EventType } from "../Enums/Types/EventType.js";
import { getRandom } from "../Utils/NumberUtils.js";
async function getItemsFromInitializer(container, map, initializers, force = false) {
    let res = map.get(container);
    if (!res || force) {
        res = await Promise.all([...initializers.values()].map(t => t(container)));
        map.set(container, res);
    }
    return res;
}
async function getDataFromUrl(data) {
    const url = itemFromSingleOrMultiple(data.url, data.index);
    if (!url) {
        return data.fallback;
    }
    const response = await fetch(url);
    if (response.ok) {
        return (await response.json());
    }
    getLogger().error(`${errorPrefix} ${response.status} while retrieving config file`);
    return data.fallback;
}
const generatedTrue = "true", generatedFalse = "false", canvasTag = "canvas", getCanvasFromContainer = (domContainer) => {
    let canvasEl;
    if (domContainer instanceof HTMLCanvasElement || domContainer.tagName.toLowerCase() === canvasTag) {
        canvasEl = domContainer;
        if (!canvasEl.dataset[generatedAttribute]) {
            canvasEl.dataset[generatedAttribute] = generatedFalse;
        }
    }
    else {
        const existingCanvases = domContainer.getElementsByTagName(canvasTag);
        if (existingCanvases.length) {
            const firstIndex = 0;
            canvasEl = existingCanvases[firstIndex];
            canvasEl.dataset[generatedAttribute] = generatedFalse;
        }
        else {
            canvasEl = document.createElement(canvasTag);
            canvasEl.dataset[generatedAttribute] = generatedTrue;
            domContainer.appendChild(canvasEl);
        }
    }
    const fullPercent = "100%";
    if (!canvasEl.style.width) {
        canvasEl.style.width = fullPercent;
    }
    if (!canvasEl.style.height) {
        canvasEl.style.height = fullPercent;
    }
    return canvasEl;
}, getDomContainer = (id, source) => {
    let domContainer = source ?? document.getElementById(id);
    if (domContainer) {
        return domContainer;
    }
    domContainer = document.createElement("div");
    domContainer.id = id;
    domContainer.dataset[generatedAttribute] = generatedTrue;
    document.body.append(domContainer);
    return domContainer;
};
export class Engine {
    constructor() {
        this._configs = new Map();
        this._domArray = [];
        this._eventDispatcher = new EventDispatcher();
        this._initialized = false;
        this.plugins = [];
        this.colorManagers = new Map();
        this.easingFunctions = new Map();
        this._initializers = {
            interactors: new Map(),
            movers: new Map(),
            updaters: new Map(),
        };
        this.interactors = new Map();
        this.movers = new Map();
        this.updaters = new Map();
        this.presets = new Map();
        this.effectDrawers = new Map();
        this.shapeDrawers = new Map();
        this.pathGenerators = new Map();
    }
    get configs() {
        const res = {};
        for (const [name, config] of this._configs) {
            res[name] = config;
        }
        return res;
    }
    get items() {
        return this._domArray;
    }
    get version() {
        return "3.7.1";
    }
    async addColorManager(manager, refresh = true) {
        this.colorManagers.set(manager.key, manager);
        await this.refresh(refresh);
    }
    addConfig(config) {
        const key = config.key ?? config.name ?? "default";
        this._configs.set(key, config);
        this._eventDispatcher.dispatchEvent(EventType.configAdded, { data: { name: key, config } });
    }
    async addEasing(name, easing, refresh = true) {
        if (this.getEasing(name)) {
            return;
        }
        this.easingFunctions.set(name, easing);
        await this.refresh(refresh);
    }
    async addEffect(effect, drawer, refresh = true) {
        executeOnSingleOrMultiple(effect, type => {
            if (!this.getEffectDrawer(type)) {
                this.effectDrawers.set(type, drawer);
            }
        });
        await this.refresh(refresh);
    }
    addEventListener(type, listener) {
        this._eventDispatcher.addEventListener(type, listener);
    }
    async addInteractor(name, interactorInitializer, refresh = true) {
        this._initializers.interactors.set(name, interactorInitializer);
        await this.refresh(refresh);
    }
    async addMover(name, moverInitializer, refresh = true) {
        this._initializers.movers.set(name, moverInitializer);
        await this.refresh(refresh);
    }
    async addParticleUpdater(name, updaterInitializer, refresh = true) {
        this._initializers.updaters.set(name, updaterInitializer);
        await this.refresh(refresh);
    }
    async addPathGenerator(name, generator, refresh = true) {
        if (!this.getPathGenerator(name)) {
            this.pathGenerators.set(name, generator);
        }
        await this.refresh(refresh);
    }
    async addPlugin(plugin, refresh = true) {
        if (!this.getPlugin(plugin.id)) {
            this.plugins.push(plugin);
        }
        await this.refresh(refresh);
    }
    async addPreset(preset, options, override = false, refresh = true) {
        if (override || !this.getPreset(preset)) {
            this.presets.set(preset, options);
        }
        await this.refresh(refresh);
    }
    async addShape(drawer, refresh = true) {
        for (const validType of drawer.validTypes) {
            if (this.getShapeDrawer(validType)) {
                continue;
            }
            this.shapeDrawers.set(validType, drawer);
        }
        await this.refresh(refresh);
    }
    clearPlugins(container) {
        this.updaters.delete(container);
        this.movers.delete(container);
        this.interactors.delete(container);
    }
    dispatchEvent(type, args) {
        this._eventDispatcher.dispatchEvent(type, args);
    }
    dom() {
        return this.items;
    }
    domItem(index) {
        return this.item(index);
    }
    async getAvailablePlugins(container) {
        const res = new Map();
        for (const plugin of this.plugins) {
            if (plugin.needsPlugin(container.actualOptions)) {
                res.set(plugin.id, await plugin.getPlugin(container));
            }
        }
        return res;
    }
    getEasing(name) {
        return this.easingFunctions.get(name) ?? ((value) => value);
    }
    getEffectDrawer(type) {
        return this.effectDrawers.get(type);
    }
    async getInteractors(container, force = false) {
        return getItemsFromInitializer(container, this.interactors, this._initializers.interactors, force);
    }
    async getMovers(container, force = false) {
        return getItemsFromInitializer(container, this.movers, this._initializers.movers, force);
    }
    getPathGenerator(type) {
        return this.pathGenerators.get(type);
    }
    getPlugin(plugin) {
        return this.plugins.find(t => t.id === plugin);
    }
    getPreset(preset) {
        return this.presets.get(preset);
    }
    getShapeDrawer(type) {
        return this.shapeDrawers.get(type);
    }
    getSupportedEffects() {
        return this.effectDrawers.keys();
    }
    getSupportedShapes() {
        return this.shapeDrawers.keys();
    }
    async getUpdaters(container, force = false) {
        return getItemsFromInitializer(container, this.updaters, this._initializers.updaters, force);
    }
    init() {
        if (this._initialized) {
            return;
        }
        this._initialized = true;
    }
    item(index) {
        const { items } = this, item = items[index];
        if (!item || item.destroyed) {
            const deleteCount = 1;
            items.splice(index, deleteCount);
            return;
        }
        return item;
    }
    async load(params) {
        const randomFactor = 10000, id = params.id ?? params.element?.id ?? `tsparticles${Math.floor(getRandom() * randomFactor)}`, { index, url } = params, options = url ? await getDataFromUrl({ fallback: params.options, url, index }) : params.options;
        const currentOptions = itemFromSingleOrMultiple(options, index), { items } = this, oldIndex = items.findIndex(v => v.id.description === id), minIndex = 0, newItem = new Container(this, id, currentOptions);
        if (oldIndex >= minIndex) {
            const old = this.item(oldIndex), one = 1, none = 0, deleteCount = old ? one : none;
            if (old && !old.destroyed) {
                old.destroy(false);
            }
            items.splice(oldIndex, deleteCount, newItem);
        }
        else {
            items.push(newItem);
        }
        const domContainer = getDomContainer(id, params.element), canvasEl = getCanvasFromContainer(domContainer);
        newItem.canvas.loadCanvas(canvasEl);
        await newItem.start();
        return newItem;
    }
    loadOptions(options, sourceOptions) {
        this.plugins.forEach(plugin => plugin.loadOptions?.(options, sourceOptions));
    }
    loadParticlesOptions(container, options, ...sourceOptions) {
        const updaters = this.updaters.get(container);
        if (!updaters) {
            return;
        }
        updaters.forEach(updater => updater.loadOptions?.(options, ...sourceOptions));
    }
    async refresh(refresh = true) {
        if (!refresh) {
            return;
        }
        await Promise.all(this.items.map(t => t.refresh()));
    }
    removeEventListener(type, listener) {
        this._eventDispatcher.removeEventListener(type, listener);
    }
    setOnClickHandler(callback) {
        const { items } = this;
        if (!items.length) {
            throw new Error(`${errorPrefix} can only set click handlers after calling tsParticles.load()`);
        }
        items.forEach(item => item.addClickHandler(callback));
    }
}
