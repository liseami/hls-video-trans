(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Options/Classes/Preload.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImagePreloaderPlugin = void 0;
    const Preload_js_1 = require("./Options/Classes/Preload.js");
    class ImagePreloaderPlugin {
        constructor(engine) {
            this.id = "imagePreloader";
            this._engine = engine;
        }
        async getPlugin() {
            await Promise.resolve();
            return {};
        }
        loadOptions(options, source) {
            if (!source?.preload) {
                return;
            }
            if (!options.preload) {
                options.preload = [];
            }
            const preloadOptions = options.preload;
            for (const item of source.preload) {
                const existing = preloadOptions.find(t => t.name === item.name || t.src === item.src);
                if (existing) {
                    existing.load(item);
                }
                else {
                    const preload = new Preload_js_1.Preload();
                    preload.load(item);
                    preloadOptions.push(preload);
                }
            }
        }
        needsPlugin() {
            return true;
        }
    }
    exports.ImagePreloaderPlugin = ImagePreloaderPlugin;
});
