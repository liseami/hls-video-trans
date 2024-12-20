(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../Utils/Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Plugins = void 0;
    const Utils_1 = require("../../Utils/Utils");
    function getItemsFromInitializer(container, map, initializers, force = false) {
        let res = map.get(container);
        if (!res || force) {
            res = [...initializers.values()].map((t) => t(container));
            map.set(container, res);
        }
        return res;
    }
    class Plugins {
        constructor(engine) {
            this._engine = engine;
            this.plugins = [];
            this._initializers = {
                interactors: new Map(),
                movers: new Map(),
                updaters: new Map(),
            };
            this.interactors = new Map();
            this.movers = new Map();
            this.updaters = new Map();
            this.presets = new Map();
            this.drawers = new Map();
            this.pathGenerators = new Map();
        }
        addInteractor(name, initInteractor) {
            this._initializers.interactors.set(name, initInteractor);
        }
        addParticleMover(name, initMover) {
            this._initializers.movers.set(name, initMover);
        }
        addParticleUpdater(name, initUpdater) {
            this._initializers.updaters.set(name, initUpdater);
        }
        addPathGenerator(type, pathGenerator) {
            !this.getPathGenerator(type) && this.pathGenerators.set(type, pathGenerator);
        }
        addPlugin(plugin) {
            !this.getPlugin(plugin.id) && this.plugins.push(plugin);
        }
        addPreset(presetKey, options, override = false) {
            (override || !this.getPreset(presetKey)) && this.presets.set(presetKey, options);
        }
        addShapeDrawer(types, drawer) {
            (0, Utils_1.executeOnSingleOrMultiple)(types, (type) => {
                !this.getShapeDrawer(type) && this.drawers.set(type, drawer);
            });
        }
        destroy(container) {
            this.updaters.delete(container);
            this.movers.delete(container);
            this.interactors.delete(container);
        }
        getAvailablePlugins(container) {
            const res = new Map();
            for (const plugin of this.plugins) {
                plugin.needsPlugin(container.actualOptions) && res.set(plugin.id, plugin.getPlugin(container));
            }
            return res;
        }
        getInteractors(container, force = false) {
            return getItemsFromInitializer(container, this.interactors, this._initializers.interactors, force);
        }
        getMovers(container, force = false) {
            return getItemsFromInitializer(container, this.movers, this._initializers.movers, force);
        }
        getPathGenerator(type) {
            return this.pathGenerators.get(type);
        }
        getPlugin(plugin) {
            return this.plugins.find((t) => t.id === plugin);
        }
        getPreset(preset) {
            return this.presets.get(preset);
        }
        getShapeDrawer(type) {
            return this.drawers.get(type);
        }
        getSupportedShapes() {
            return this.drawers.keys();
        }
        getUpdaters(container, force = false) {
            return getItemsFromInitializer(container, this.updaters, this._initializers.updaters, force);
        }
        loadOptions(options, sourceOptions) {
            for (const plugin of this.plugins) {
                plugin.loadOptions(options, sourceOptions);
            }
        }
        loadParticlesOptions(container, options, ...sourceOptions) {
            const updaters = this.updaters.get(container);
            if (!updaters) {
                return;
            }
            for (const updater of updaters) {
                updater.loadOptions && updater.loadOptions(options, ...sourceOptions);
            }
        }
    }
    exports.Plugins = Plugins;
});
