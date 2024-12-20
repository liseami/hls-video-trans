import { LinkInstance } from "./LinkInstance.js";
export class LinksPlugin {
    constructor(engine) {
        this.id = "links";
        this._engine = engine;
    }
    getPlugin(container) {
        return Promise.resolve(new LinkInstance(container, this._engine));
    }
    loadOptions() {
    }
    needsPlugin() {
        return true;
    }
}
