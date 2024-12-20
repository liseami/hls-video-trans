(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Linker.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadLinksInteraction = loadLinksInteraction;
    const Linker_js_1 = require("./Linker.js");
    async function loadLinksInteraction(engine, refresh = true) {
        await engine.addInteractor("particlesLinks", async (container) => {
            return Promise.resolve(new Linker_js_1.Linker(container, engine));
        }, refresh);
    }
});
