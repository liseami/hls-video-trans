import { Preload } from "./Options/Classes/Preload.js";
export class ImagePreloaderPlugin {
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
                const preload = new Preload();
                preload.load(item);
                preloadOptions.push(preload);
            }
        }
    }
    needsPlugin() {
        return true;
    }
}
