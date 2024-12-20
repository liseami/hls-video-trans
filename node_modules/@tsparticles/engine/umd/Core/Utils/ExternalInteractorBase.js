(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../Enums/Types/InteractorType.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExternalInteractorBase = void 0;
    const InteractorType_js_1 = require("../../Enums/Types/InteractorType.js");
    class ExternalInteractorBase {
        constructor(container) {
            this.type = InteractorType_js_1.InteractorType.external;
            this.container = container;
        }
    }
    exports.ExternalInteractorBase = ExternalInteractorBase;
});
